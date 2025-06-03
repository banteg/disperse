import type { Recipient, TokenInfo } from "../types";
import DisperseAddresses from "./DisperseAddresses";
import TransactionButton from "./TransactionButton";

interface TransactionSectionProps {
  sending: "ether" | "token" | null;
  recipients: Recipient[];
  token: TokenInfo;
  symbol: string;
  decimals: number;
  balance: bigint;
  leftAmount: bigint;
  totalAmount: bigint;
  disperseMessage?: string;
  realChainId?: number;
  verifiedAddress?: { address: `0x${string}`; label: string } | null;
  account?: `0x${string}`;
  nativeCurrencyName?: string;
  effectiveAllowance?: bigint;
}

export default function TransactionSection({
  sending,
  recipients,
  token,
  symbol,
  decimals,
  balance,
  leftAmount,
  totalAmount,
  disperseMessage,
  realChainId,
  verifiedAddress,
  account,
  nativeCurrencyName = "ETH",
  effectiveAllowance = 0n,
}: TransactionSectionProps) {
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
            chainId={realChainId}
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
            chainId={realChainId}
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
            chainId={realChainId}
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
