import { useCallback, useMemo, useRef } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useChainId, useConfig, useConnect } from "wagmi";

import { Suspense, lazy } from "react";
import CurrencySelector from "./components/CurrencySelector";
import Header from "./components/Header";
import NetworkStatus from "./components/NetworkStatus";
import RecipientInput from "./components/RecipientInput";
import TokenLoader from "./components/TokenLoader";
import TransactionSection from "./components/TransactionSection";
const DebugPanel = lazy(() => import("./components/debug/DebugPanel"));
import { AppState } from "./constants";
// import { useAppState } from "./hooks/useAppState"; // Replaced by Zustand
import { useContractVerification } from "./hooks/useContractVerification";
// import { useCurrencySelection } from "./hooks/useCurrencySelection"; // Replaced by Zustand
import { useTokenAllowance } from "./hooks/useTokenAllowance";
import { useAppStore } from "../store/appStore"; // Import Zustand store
import type { Recipient } from "./types"; // TokenInfo will be from store
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
  const chainId = useChainId();
  const { address, status, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address,
    chainId: chainId,
  });
  const { connectors, connect } = useConnect();

  const isChainSupported = chainId ? config.chains.some((chain) => chain.id === chainId) : false;

  // Zustand store integration
  const appState = useAppStore((state) => state.appState);
  const setAppState = useAppStore((state) => state.setAppState);
  const recipients = useAppStore((state) => state.recipients);
  const setRecipients = useAppStore((state) => state.setRecipients);
  const customContractAddress = useAppStore((state) => state.customContractAddress);
  const setCustomContractAddress = useAppStore((state) => state.setCustomContractAddress);
  const sending = useAppStore((state) => state.sending);
  const setSending = useAppStore((state) => state.setSending);
  const token = useAppStore((state) => state.token);
  const setToken = useAppStore((state) => state.setToken);
  const resetTokenStore = useAppStore((state) => state.resetToken);
  const textareaValue = useAppStore((state) => state.textareaValue);
  const evaluateAndSetAppState = useAppStore((state) => state.evaluateAndSetAppState);
  // const setTextareaValue = useAppStore((state) => state.setTextareaValue); // Not directly used in App.tsx, but through RecipientInput

  const {
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
  } = useContractVerification(chainId, isConnected, customContractAddress);

  const canDeploy = canDeployToNetwork(chainId);

  const handleContractDeployed = useCallback(
    (address: `0x${string}`) => {
      setCustomContractAddress(address);
    },
    [setCustomContractAddress],
  );

  const walletStatus = status === "connected" ? `logged in as ${address}` : "please unlock wallet";
  const textareaRef = useRef<HTMLTextAreaElement>(null); // This ref is still used by RecipientInput, managed there

  // const { sending, token, setSending, setToken } = useCurrencySelection(); // Replaced by Zustand

  // const { appState, setAppState } = useAppState({ // Replaced by Zustand
  //   status,
  //   isConnected,
  //   chainId,
  //   isChainSupported,
  //   isContractDeployed,
  //   isBytecodeLoading,
  //   hasContractAddress,
  //   sending,
  //   token,
  // });

  // Effect to call the new store action that encapsulates useAppState logic
  useEffect(() => {
    evaluateAndSetAppState({
      status,
      isConnected,
      chainId,
      isChainSupported,
      isContractDeployed, // This is from useContractVerification
      isBytecodeLoading,
      hasContractAddress,
      // sending and token are read directly from store state within the action
    });
  }, [
    status,
    isConnected,
    chainId,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
    evaluateAndSetAppState,
  ]);

  const parseAmounts = useCallback(() => {
    // Textarea value will now be read from the store, set by RecipientInput
    // For now, let's assume RecipientInput updates the store, and here we read it.
    // However, the prompt says "Should get textareaRef.current.value" for parseAmounts.
    // This implies parseAmounts might be called from places other than RecipientInput's onChange.
    // Let's stick to the prompt for now, but this might need adjustment if RecipientInput is the sole source of truth for textareaValue.
    if (!textareaRef.current) return; // Keep this check if textareaRef is still used directly
    const text = textareaRef.current.value; // As per prompt
    // const text = textareaValue; // Alternative if textareaValue from store is preferred source.

    const currentToken = useAppStore.getState().token; // Get latest token from store
    const currentSending = useAppStore.getState().sending; // Get latest sending from store

    const decimals = getDecimals(currentSending, currentToken);
    const newRecipients = parseRecipients(text, decimals);

    setRecipients(newRecipients);

    if (
      newRecipients.length &&
      (currentSending === "ether" || (currentSending === "token" && currentToken.address && currentToken.decimals !== undefined))
    ) {
      setAppState(AppState.ENTERED_AMOUNTS);
    }
  }, [setRecipients, setAppState]); // Dependencies: sending and token are now read directly from store inside

  const handleRecipientsChange = useCallback(
    (newRecipients: Recipient[]) => {
      setRecipients(newRecipients);
      const currentToken = useAppStore.getState().token; // Get latest token from store
      const currentSending = useAppStore.getState().sending; // Get latest sending from store

      if (
        newRecipients.length &&
        (currentSending === "ether" || (currentSending === "token" && currentToken.address && currentToken.decimals !== undefined))
      ) {
        setAppState(AppState.ENTERED_AMOUNTS);
      }
    },
    [setRecipients, setAppState], // Dependencies: sending and token are now read directly from store inside
  );

  const resetToken = useCallback(() => {
    resetTokenStore(); // Use store action
  }, [resetTokenStore]);

  const selectCurrency = useCallback(
    (type: "ether" | "token") => {
      setSending(type);
      const currentToken = useAppStore.getState().token; // Get latest token

      if (type === "ether") {
        setAppState(AppState.SELECTED_CURRENCY);
        requestAnimationFrame(() => {
          // if (textareaRef.current?.value) { // Check store's textareaValue instead if fully migrated
          //   parseAmounts();
          // }
          // For now, assuming parseAmounts still relies on textareaRef as per prompt for parseAmounts
          if (textareaRef.current?.value) {
             parseAmounts();
          }
        });
      } else if (type === "token") {
        if (currentToken.address && currentToken.decimals !== undefined && currentToken.symbol) {
          setAppState(AppState.SELECTED_CURRENCY);
          requestAnimationFrame(() => {
            // if (textareaRef.current?.value) {
            //  parseAmounts();
            // }
            if (textareaRef.current?.value) {
               parseAmounts();
            }
          });
        } else {
          resetTokenStore(); // Use store action
        }
      }
    },
    [setSending, setAppState, parseAmounts, resetTokenStore], // token removed, resetToken replaced
  );

  const selectToken = useCallback(
    (selectedTokenInfo: typeof token) => { // Use 'typeof token' for selectedTokenInfo type
      setToken(selectedTokenInfo);
      setSending("token");
      setAppState(AppState.SELECTED_CURRENCY);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            if (selectedTokenInfo.decimals !== undefined) {
              parseAmounts();
            }
          }
        });
      });
    },
    [setToken, setSending, setAppState, parseAmounts],
  );

  // Use reactive allowance hook
  const { allowance: currentAllowance } = useTokenAllowance(); // Props are now sourced internally

  // Use the reactive allowance if available, otherwise fall back to the stored token allowance
  const effectiveAllowance = currentAllowance ?? token.allowance ?? 0n; // token from store

  // Memoize expensive calculations
  const totalAmount = useMemo(() => getTotalAmount(recipients), [recipients]); // recipients from store
  const balance = useMemo(() => getBalance(sending, token, balanceData), [sending, token, balanceData]); // sending, token from store
  const leftAmount = useMemo(
    () => getLeftAmount(recipients, sending, token, balanceData), // recipients, sending, token from store
    [recipients, sending, token, balanceData],
  );
  const disperseMessage = useMemo(
    () => getDisperseMessage(recipients, sending, { ...token, allowance: effectiveAllowance }, balanceData), // recipients, sending, token from store
    [recipients, sending, token, effectiveAllowance, balanceData],
  );
  const symbol = useMemo(() => getSymbol(sending, token, chainId), [sending, token, chainId]); // sending, token from store
  const decimals = useMemo(() => getDecimals(sending, token), [sending, token]); // sending, token from store
  const nativeCurrencyName = useMemo(() => getNativeCurrencyName(chainId), [chainId]);

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
      <Header chainId={chainId} address={address} />

      {appState === AppState.WALLET_REQUIRED && (
        <section>
          <h2>wallet required</h2>
          <p>non-ethereum browser, consider installing a wallet.</p>
        </section>
      )}

      {appState === AppState.NETWORK_UNAVAILABLE && (
        <NetworkStatus />
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
              {balanceData?.value === 0n && chainId && <span className="warning">(make sure to add funds)</span>}
            </p>
          )}
        </section>
      )}

      {appState >= AppState.CONNECTED_TO_WALLET && sending === "token" && (
        <section>
          <TokenLoader
            onSelect={selectToken}
            onError={resetTokenStore} {/* Use store action */}
            // chainId, account, token, contractAddress are now sourced from store/hooks within TokenLoader
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
          <RecipientInput onRecipientsChange={handleRecipientsChange} />
        )}

      {appState >= AppState.ENTERED_AMOUNTS && (
        <TransactionSection />
      )}

      {/* Debug Panel */}
      <Suspense fallback={null}>
        <DebugPanel />
      </Suspense>
    </article>
  );
}

export default App;
