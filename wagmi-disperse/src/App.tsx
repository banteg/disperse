import { useCallback, useEffect, useMemo, useRef } from "react";
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
import { useContractVerification } from "./hooks/useContractVerification";
import { useTokenAllowance } from "./hooks/useTokenAllowance";
import type { Recipient, TokenInfo } from "./types";

// Import Zustand store hooks
import { useAppState, useContract, useCurrency, useTransaction, useWallet } from "./store";

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

  // Zustand store hooks
  const { updateWallet } = useWallet();
  const { sending, token, setSending, setToken, resetToken } = useCurrency();
  const { recipients, setRecipients } = useTransaction();
  const { customContractAddress, setCustomContractAddress, updateContract } = useContract();
  const { appState, setAppState } = useAppState();

  const isChainSupported = chainId ? config.chains.some((chain) => chain.id === chainId) : false;

  // Update wallet state in store when wagmi state changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: updateWallet is stable
  useEffect(() => {
    updateWallet({
      address,
      chainId,
      isConnected,
      status,
      isChainSupported,
    });
  }, [address, chainId, isConnected, status, isChainSupported]);

  const {
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
  } = useContractVerification(chainId, isConnected, customContractAddress);

  // Update contract state in store
  // biome-ignore lint/correctness/useExhaustiveDependencies: updateContract is stable
  useEffect(() => {
    updateContract({
      verifiedAddress,
      hasContractAddress,
      isContractDeployed,
      isBytecodeLoading,
      potentialAddresses,
      createxDisperseAddress,
    });
  }, [
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
  ]);

  // App state logic - simplified since most is now in the store
  useEffect(() => {
    if (status === "reconnecting" || status === "connecting") return;

    if (status === "disconnected") {
      setAppState(AppState.UNLOCK_WALLET);
    } else if (isConnected && (!isContractDeployed || !isChainSupported)) {
      if (isBytecodeLoading && hasContractAddress) {
        return;
      }

      if (isContractDeployed) {
        if (sending === "ether") {
          setAppState(AppState.SELECTED_CURRENCY);
        } else if (sending === "token") {
          if (token.address && token.decimals !== undefined && token.symbol) {
            setAppState(AppState.SELECTED_CURRENCY);
          } else {
            setAppState(AppState.CONNECTED_TO_WALLET);
          }
        } else if (sending === null) {
          setAppState(AppState.CONNECTED_TO_WALLET);
        }
        return;
      }

      setAppState(AppState.NETWORK_UNAVAILABLE);
    } else if (isConnected) {
      if (sending === "ether") {
        setAppState(AppState.SELECTED_CURRENCY);
      } else if (sending === "token") {
        if (token.address && token.decimals !== undefined && token.symbol) {
          setAppState(AppState.SELECTED_CURRENCY);
        } else {
          setAppState(AppState.CONNECTED_TO_WALLET);
        }
      } else if (sending === null) {
        setAppState(AppState.CONNECTED_TO_WALLET);
      }
    }
  }, [
    status,
    isConnected,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
    sending,
    token,
    setAppState,
  ]);

  // Handle app state transition to ENTERED_AMOUNTS
  useEffect(() => {
    if (
      recipients.length &&
      (sending === "ether" || (sending === "token" && token.address && token.decimals !== undefined))
    ) {
      setAppState(AppState.ENTERED_AMOUNTS);
    }
  }, [recipients, sending, token, setAppState]);

  const canDeploy = canDeployToNetwork(chainId);

  const handleContractDeployed = useCallback(
    (address: `0x${string}`) => {
      setCustomContractAddress(address);
    },
    [setCustomContractAddress],
  );

  const walletStatus = status === "connected" ? `logged in as ${address}` : "please unlock wallet";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const parseAmounts = useCallback(() => {
    if (!textareaRef.current) return;

    const text = textareaRef.current.value;
    const decimals = getDecimals(sending, token);
    const newRecipients = parseRecipients(text, decimals);

    setRecipients(newRecipients);
  }, [sending, token, setRecipients]);

  const handleRecipientsChange = useCallback(
    (newRecipients: Recipient[]) => {
      setRecipients(newRecipients);
    },
    [setRecipients],
  );

  const selectCurrency = useCallback(
    (type: "ether" | "token") => {
      setSending(type);

      if (type === "ether") {
        requestAnimationFrame(() => {
          if (textareaRef.current?.value) {
            parseAmounts();
          }
        });
      } else if (type === "token") {
        if (token.address && token.decimals !== undefined && token.symbol) {
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
    [setSending, token, parseAmounts, resetToken],
  );

  const selectToken = useCallback(
    (tokenInfo: TokenInfo) => {
      setToken(tokenInfo);

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
    [setToken, parseAmounts],
  );

  // Use reactive allowance hook
  const { allowance: currentAllowance } = useTokenAllowance({
    tokenAddress: token.address,
    account: address,
    spender: verifiedAddress?.address,
    chainId: chainId,
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
  const symbol = useMemo(() => getSymbol(sending, token, chainId), [sending, token, chainId]);
  const decimals = useMemo(() => getDecimals(sending, token), [sending, token]);
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
        <NetworkStatus
          chainId={chainId}
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
              {balanceData?.value === 0n && chainId && <span className="warning">(make sure to add funds)</span>}
            </p>
          )}
        </section>
      )}

      {appState >= AppState.CONNECTED_TO_WALLET && sending === "token" && (
        <section>
          <TokenLoader
            onSelect={selectToken}
            onError={resetToken}
            chainId={chainId}
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
          chainId={chainId}
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
          chainId={chainId}
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
