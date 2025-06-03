import { useCallback, useRef, useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useConfig, useConnect } from "wagmi";

import CurrencySelector from "./components/CurrencySelector";
import DeployContract from "./components/DeployContract";
import DisperseAddresses from "./components/DisperseAddresses";
import Header from "./components/Header";
import TokenLoader from "./components/TokenLoader";
import TransactionButton from "./components/TransactionButton";
import DebugPanel from "./components/debug/DebugPanel";
import { AppState } from "./constants";
import { useAppState } from "./hooks/useAppState";
import { useContractVerification } from "./hooks/useContractVerification";
import { useCurrencySelection } from "./hooks/useCurrencySelection";
import { useRealChainId } from "./hooks/useRealChainId";
import { useTokenAllowance } from "./hooks/useTokenAllowance";
import { networkName } from "./networks";
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

  const totalAmount = getTotalAmount(recipients);
  const balance = getBalance(sending, token, balanceData);
  const leftAmount = getLeftAmount(recipients, sending, token, balanceData);
  const disperseMessage = getDisperseMessage(
    recipients,
    sending,
    { ...token, allowance: effectiveAllowance },
    balanceData,
  );
  const symbol = getSymbol(sending, token, realChainId);
  const decimals = getDecimals(sending, token);
  const nativeCurrencyName = getNativeCurrencyName(realChainId);

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
        <section>
          <h2>unsupported network</h2>
          {isBytecodeLoading ? (
            <p>
              <span className="checking">checking if disperse contract is deployed on any address...</span>
            </p>
          ) : isContractDeployed ? (
            <>
              <p>
                disperse contract found at {verifiedAddress?.label} address, but this network isn't configured yet in
                our app. reload the page to try again.
              </p>
              <div className="success">
                <p>valid contract address: {verifiedAddress?.address}</p>
              </div>
              <button onClick={() => window.location.reload()}>reload page</button>
            </>
          ) : !isConnected ? (
            <p>connect your wallet to deploy the disperse contract on this network.</p>
          ) : (
            <>
              <p>
                no disperse contract found on <em>{networkName(realChainId)?.toLowerCase() || "this network"}</em>. you
                can deploy it yourself.
              </p>
              <DeployContract chainId={realChainId} onSuccess={handleContractDeployed} />
            </>
          )}

          <div className="network-info">
            <p>
              network: {networkName(realChainId)?.toLowerCase() || "unknown"} (id: {realChainId})
            </p>
            {verifiedAddress && (
              <p>
                verified contract: {verifiedAddress.address}
                <span className="badge">{verifiedAddress.label}</span>
              </p>
            )}
          </div>
        </section>
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
          <section>
            <h2>recipients and amounts</h2>
            <p>enter one address and amount in {symbol} on each line. supports any format.</p>
            <div className="shadow">
              <textarea
                ref={textareaRef}
                spellCheck="false"
                onChange={parseAmounts}
                id="recipients-textarea"
                placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"
              />
            </div>
          </section>
        )}

      {appState >= AppState.ENTERED_AMOUNTS && (
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
              account={address}
            />
          )}
        </section>
      )}

      {appState >= AppState.ENTERED_AMOUNTS && sending === "token" && (
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
            account={address}
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
            account={address}
          />
        </div>
      )}

      {/* Debug Panel */}
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
    </article>
  );
}

export default App;
