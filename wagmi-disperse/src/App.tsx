import { useCallback, useMemo, useRef } from "react";
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
import { useAppStateSync } from "./hooks/useAppStateSync";
import { useContractVerification } from "./hooks/useContractVerification";
import { useRealChainId } from "./hooks/useRealChainId";
import { useTokenAllowance } from "./hooks/useTokenAllowance";
import { useStore } from "./store";
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

  // Get state and actions from Zustand store
  const {
    appState,
    sending,
    token,
    recipients,
    customContractAddress,
    setAppState,
    setSending,
    setToken,
    setRecipients,
    setCustomContractAddress,
    resetToken,
    selectCurrency,
    selectToken,
  } = useStore();

  const {
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
  } = useContractVerification(realChainId, isConnected, customContractAddress);

  const canDeploy = canDeployToNetwork(realChainId);

  const handleContractDeployed = useCallback(
    (address: `0x${string}`) => {
      setCustomContractAddress(address);
    },
    [setCustomContractAddress],
  );

  const walletStatus = status === "connected" ? `logged in as ${address}` : "please unlock wallet";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync app state based on connection status
  useAppStateSync({
    status,
    isConnected,
    realChainId,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
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
  }, [sending, token, setAppState, setRecipients]);

  const handleSelectCurrency = useCallback(
    (type: "ether" | "token") => {
      selectCurrency(type);
      requestAnimationFrame(() => {
        if (textareaRef.current?.value) {
          parseAmounts();
        }
      });
    },
    [selectCurrency, parseAmounts],
  );

  const handleSelectToken = useCallback(
    (tokenInfo: TokenInfo) => {
      selectToken(tokenInfo);
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
    [selectToken, parseAmounts],
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
          <CurrencySelector onSelect={handleSelectCurrency} />
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
            onSelect={handleSelectToken}
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
          (sending === "token" && !!token.symbol)) && <RecipientInput />}

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
          realChainId={realChainId}
          isChainSupported={isChainSupported}
          hasContractAddress={hasContractAddress}
          isContractDeployed={isContractDeployed}
          isBytecodeLoading={isBytecodeLoading}
          verifiedAddress={verifiedAddress}
          canDeploy={canDeploy}
          createxDisperseAddress={createxDisperseAddress}
          potentialAddresses={potentialAddresses}
          isConnected={isConnected}
        />
      </Suspense>
    </article>
  );
}

export default App;
