import { useMemo } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
import { useAppStore } from "../../store/appStore";
import { useTokenAllowance } from "../../hooks/useTokenAllowance";
import {
  getBalance,
  getDecimals,
  getDisperseMessage,
  getLeftAmount,
  getNativeCurrencyName,
  getSymbol,
  getTotalAmount,
} from "../../utils/balanceCalculations";
import DisperseAddresses from "./DisperseAddresses";
import TransactionButton from "./TransactionButton";
// Recipient and TokenInfo will be from the store or derived within the component

export default function TransactionSection() {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const sending = useAppStore((state) => state.sending);
  const recipients = useAppStore((state) => state.recipients);
  const token = useAppStore((state) => state.token);
  const verifiedAddress = useAppStore((state) => state.verifiedAddress);

  const { data: balanceData } = useBalance({
    address: account,
    chainId: chainId,
    // For token balance, it's usually handled by token.balance from store,
    // but useBalance is for native currency. getBalance utility handles this.
  });

  // Use reactive allowance hook
  const { allowance: currentAllowance } = useTokenAllowance(); // Props are now sourced internally

  // Use the reactive allowance if available, otherwise fall back to the stored token allowance
  const effectiveAllowance = useMemo(() => currentAllowance ?? token.allowance ?? 0n, [currentAllowance, token.allowance]);

  // Memoize expensive calculations
  const totalAmount = useMemo(() => getTotalAmount(recipients), [recipients]);
  const balance = useMemo(() => getBalance(sending, token, balanceData), [sending, token, balanceData]);
  const leftAmount = useMemo(
    () => getLeftAmount(recipients, sending, token, balanceData),
    [recipients, sending, token, balanceData],
  );
  const disperseMessage = useMemo(
    () => getDisperseMessage(recipients, sending, { ...token, allowance: effectiveAllowance }, balanceData),
    [recipients, sending, token, effectiveAllowance, balanceData],
  );
  const symbol = useMemo(() => getSymbol(sending, token, chainId), [sending, token, chainId]);
  const decimals = useMemo(() => getDecimals(sending, token), [sending, token]);
  const nativeCurrencyName = useMemo(() => getNativeCurrencyName(chainId) || "ETH", [chainId]);


  return (
    <>
      <section>
        <h2>confirm</h2>
        <DisperseAddresses
          recipients={recipients}
          symbol={symbol}
          decimals={decimals}
          balance={balance}
          left={leftAmount}
          total={totalAmount}
        />
        {sending === "ether" && (
          <TransactionButton
            show={true}
            disabled={leftAmount < 0n}
            title={`disperse ${nativeCurrencyName}`}
            action="disperseEther"
            message={disperseMessage}
            chainId={chainId}
            recipients={recipients}
            token={token}
            contractAddress={verifiedAddress?.address}
            account={account}
          />
        )}
      </section>

      {sending === "token" && (
        <div>
          <h2>allowance</h2>
          <p>
            {effectiveAllowance < totalAmount
              ? "allow smart contract to transfer tokens on your behalf."
              : "disperse contract has allowance, you can send tokens now."}
          </p>
          <TransactionButton
            title={effectiveAllowance < totalAmount ? "approve" : "revoke"}
            action={effectiveAllowance < totalAmount ? "approve" : "deny"}
            chainId={chainId}
            recipients={recipients}
            token={token}
            contractAddress={verifiedAddress?.address}
            className={effectiveAllowance >= totalAmount ? "secondary" : ""}
            account={account}
          />
          <TransactionButton
            show={true}
            disabled={leftAmount < 0n || effectiveAllowance < totalAmount}
            title="disperse token"
            action="disperseToken"
            message={disperseMessage}
            chainId={chainId}
            recipients={recipients}
            token={token}
            contractAddress={verifiedAddress?.address}
            account={account}
          />
        </div>
      )}
    </>
  );
}
