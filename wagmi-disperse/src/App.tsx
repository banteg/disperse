import { useCallback, useMemo, useRef, useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useConfig, useConnect } from "wagmi";

import { Suspense, lazy } from "react";
import CurrencySelector from "./components/CurrencySelector";
import Header from "./components/Header";
import NetworkStatus from "./components/NetworkStatus";
import RecipientInput from "./components/RecipientInput";
import TokenLoader from "./components/TokenLoader";
import TransactionSection from "./components/TransactionSection";
const DebugPanel = lazy(() => import("./components/debug/DebugPanel"));
import { AppState } from "./constants";
import { useAppState } from "./hooks/useAppState";
import { useContractVerification } from "./hooks/useContractVerification";
import { useCurrencySelection } from "./hooks/useCurrencySelection";
import { useRealChainId } from "./hooks/useRealChainId";
import { useTokenAllowance } from "./hooks/useTokenAllowance";
import type { Recipient, TokenInfo } from "./types";
import {
  getBalance,
  getDecimals,
  getDisperseMessage,
  getLeftAmount,
  getNativeCurrencyName,
  getSymbol,
  getTotalAmount,
} from "./utils/balanceCalculations";
import { canDeployToNetwork } from "./utils/contractVerify";
import { parseRecipients } from "./utils/parseRecipients";

function App() {
  const config = useConfig();
  const realChainId = useRealChainId();
  const { address, status, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address,
    chainId: realChainId,
  });
  const { connectors, connect } = useConnect();

  const isChainSupported = realChainId ? config.chains.some((chain) => chain.id === realChainId) : false;
  const [customContractAddress, setCustomContractAddress] = useState<`0x${string}` | undefined>(undefined);

  const {
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
  } = useContractVerification(realChainId, isConnected, customContractAddress);

  const canDeploy = canDeployToNetwork(realChainId);

  const handleContractDeployed = useCallback((address: `0x${string}`) => {
    setCustomContractAddress(address);
  }, []);

  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const walletStatus = status === "connected" ? `logged in as ${address}` : "please unlock wallet";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { sending, token, setSending, setToken } = useCurrencySelection();

  const { appState, setAppState } = useAppState({
    status,
    isConnected,
    realChainId,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
    sending,
    token,
  });

  const parseAmounts = useCallback(() => {
    if (!textareaRef.current) return;

    const text = textareaRef.current.value;
    const decimals = getDecimals(sending, token);
    const newRecipients = parseRecipients(text, decimals);

    setRecipients(newRecipients);

    if (
      newRecipients.length &&
      (sending === "ether" || (sending === "token" && token.address && token.decimals !== undefined))
    ) {
      setAppState(AppState.ENTERED_AMOUNTS);
    }
  }, [sending, token, setAppState]);

  const handleRecipientsChange = useCallback(
    (newRecipients: Recipient[]) => {
      setRecipients(newRecipients);

      if (
        newRecipients.length &&
        (sending === "ether" || (sending === "token" && token.address && token.decimals !== undefined))
      ) {
        setAppState(AppState.ENTERED_AMOUNTS);
      }
    },
    [sending, token, setAppState],
  );

  const resetToken = useCallback(() => {
    setToken({});
    setAppState(AppState.CONNECTED_TO_WALLET);
  }, [setToken, setAppState]);

  const selectCurrency = useCallback(
    (type: "ether" | "token") => {
      setSending(type);

      if (type === "ether") {
        setAppState(AppState.SELECTED_CURRENCY);
        requestAnimationFrame(() => {
          if (textareaRef.current?.value) {
            parseAmounts();
          }
        });
      } else if (type === "token") {
        if (token.address && token.decimals !== undefined && token.symbol) {
          setAppState(AppState.SELECTED_CURRENCY);
          requestAnimationFrame(() => {
            if (textareaRef.current?.value) {
              parseAmounts();
            }
          });
        } else {
          resetToken();
        }
      }
    },
    [setSending, setAppState, token, parseAmounts, resetToken],
  );

  const selectToken = useCallback(
    (tokenInfo: TokenInfo) => {
      setToken(tokenInfo);
      setSending("token");
      setAppState(AppState.SELECTED_CURRENCY);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            if (tokenInfo.decimals !== undefined) {
              parseAmounts();
            }
          }
        });
      });
    },
    [setToken, setSending, setAppState, parseAmounts],
  );

  // Use reactive allowance hook
  const { allowance: currentAllowance } = useTokenAllowance({
    tokenAddress: token.address,
    account: address,
    spender: verifiedAddress?.address,
    chainId: realChainId,
  });

  // Use the reactive allowance if available, otherwise fall back to the stored token allowance
  const effectiveAllowance = currentAllowance ?? token.allowance ?? 0n;

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
  const symbol = useMemo(() => getSymbol(sending, token, realChainId), [sending, token, realChainId]);
  const decimals = useMemo(() => getDecimals(sending, token), [sending, token]);
  const nativeCurrencyName = useMemo(() => getNativeCurrencyName(realChainId), [realChainId]);

  // Display all wallet connectors
  const renderConnectors = () => {
    return (
      <div>
        {connectors.map((connector) => (
          <input
            key={connector.uid}
            type="submit"
            value={connector.name}
            onClick={() => connect({ connector })}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
        ))}
      </div>
    );
  };

  return (
    <article>
      <Header chainId={realChainId} address={address} />

      {appState === AppState.WALLET_REQUIRED && (
        <section>
          <h2>wallet required</h2>
          <p>non-ethereum browser, consider installing a wallet.</p>
        </section>
      )}

      {appState === AppState.NETWORK_UNAVAILABLE && (
        <NetworkStatus
          realChainId={realChainId}
          isBytecodeLoading={isBytecodeLoading}
          isContractDeployed={isContractDeployed}
          isConnected={isConnected}
          verifiedAddress={verifiedAddress}
          onContractDeployed={handleContractDeployed}
        />
      )}

      {appState >= AppState.UNLOCK_WALLET && !isConnected && (
        <section>
          <h2>connect to wallet</h2>
          <p>{renderConnectors()}</p>
          <p>{walletStatus}</p>
        </section>
      )}

      {appState >= AppState.CONNECTED_TO_WALLET && (
        <section>
          <CurrencySelector onSelect={selectCurrency} />
          {sending === "ether" && (
            <p>
              you have {formatUnits(balanceData?.value || 0n, 18)} {nativeCurrencyName}
              {balanceData?.value === 0n && realChainId && <span className="warning">(make sure to add funds)</span>}
            </p>
          )}
        </section>
      )}

      {appState >= AppState.CONNECTED_TO_WALLET && sending === "token" && (
        <section>
          <TokenLoader
            onSelect={selectToken}
            onError={resetToken}
            chainId={realChainId}
            account={address}
            token={token}
            contractAddress={verifiedAddress?.address}
          />
          {token.symbol && (
            <p className="mt">
              you have {formatUnits(token.balance || 0n, token.decimals || 18)} {token.symbol}
            </p>
          )}
        </section>
      )}

      {/* Show addresses input when:
          1. Ether is selected and we're connected to a supported wallet/network, or
          2. We're in SELECTED_CURRENCY state or higher (any currency),
          3. Token is selected and we have a valid token (with symbol)
          BUT never show when on an unsupported network (NETWORK_UNAVAILABLE state)
      */}
      {appState !== AppState.NETWORK_UNAVAILABLE &&
        ((appState >= AppState.CONNECTED_TO_WALLET && sending === "ether") ||
          appState >= AppState.SELECTED_CURRENCY ||
          (sending === "token" && !!token.symbol)) && (
          <RecipientInput sending={sending} token={token} onRecipientsChange={handleRecipientsChange} />
        )}

      {appState >= AppState.ENTERED_AMOUNTS && (
        <TransactionSection
          sending={sending}
          recipients={recipients}
          token={token}
          symbol={symbol}
          decimals={decimals}
          balance={balance}
          leftAmount={leftAmount}
          totalAmount={totalAmount}
          disperseMessage={disperseMessage}
          realChainId={realChainId}
          verifiedAddress={verifiedAddress}
          account={address}
          nativeCurrencyName={nativeCurrencyName}
          effectiveAllowance={effectiveAllowance}
        />
      )}

      {/* Debug Panel */}
      <Suspense fallback={null}>
        <DebugPanel
          appState={appState}
          realChainId={realChainId}
          isChainSupported={isChainSupported}
          hasContractAddress={hasContractAddress}
          customContractAddress={customContractAddress}
          isContractDeployed={isContractDeployed}
          isBytecodeLoading={isBytecodeLoading}
          verifiedAddress={verifiedAddress}
          canDeploy={canDeploy}
          createxDisperseAddress={createxDisperseAddress}
          potentialAddresses={potentialAddresses}
          sending={sending}
          isConnected={isConnected}
          tokenSymbol={token?.symbol}
          recipientsCount={recipients.length}
        />
      </Suspense>
    </article>
  );
}

export default App;
