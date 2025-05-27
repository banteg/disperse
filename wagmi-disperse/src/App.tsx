import { useCallback, useEffect, useRef, useState } from "react";
import { formatUnits, isAddress, parseUnits } from "viem";
import { useAccount, useBalance, useChainId, useConfig, useConnect } from "wagmi";
// Direct access to provider is needed for unsupported chains

import CurrencySelector from "./components/CurrencySelector";
import DeployContract from "./components/DeployContract";
import DisperseAddresses from "./components/DisperseAddresses";
import Header from "./components/Header";
import TokenLoader from "./components/TokenLoader";
import TransactionButton from "./components/TransactionButton";
import DebugPanel from "./components/debug/DebugPanel";
import { AppState } from "./constants";
import { disperse_createx, disperse_legacy } from "./deploy";
import { nativeSymbol, networkName, nativeCurrencyName } from "./networks";
import type { Recipient, TokenInfo } from "./types";
import { canDeployToNetwork, isDisperseContract } from "./utils/contractVerify";

// Debug function to log state changes
const debug = (message: string, data?: any) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

// Direct chain ID detection by listening to window.ethereum
function useRealChainId() {
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const wagmiChainId = useChainId(); // This only works for supported chains

  useEffect(() => {
    // Initialize with wagmi chainId if available
    if (wagmiChainId) {
      setChainId(wagmiChainId);
    }

    // Using direct ethereum provider for more reliable chain detection across all networks
    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = Number.parseInt(chainIdHex, 16);
      console.log(`Ethereum provider detected chain change to: ${newChainId} (from hex ${chainIdHex})`);
      setChainId(newChainId);
    };

    // Get the initial chainId directly from ethereum provider
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      try {
        // Get current chainId
        ethereum
          .request({ method: "eth_chainId" })
          .then((chainIdHex: string) => {
            const id = Number.parseInt(chainIdHex, 16);
            console.log(`Initial ethereum chainId: ${id} (from hex ${chainIdHex})`);
            setChainId(id);
          })
          .catch((err: any) => console.error("Error getting chainId:", err));

        // Listen for chain changes
        ethereum.on("chainChanged", handleChainChanged);

        // Cleanup
        return () => {
          ethereum.removeListener("chainChanged", handleChainChanged);
        };
      } catch (err) {
        console.error("Error accessing ethereum provider:", err);
      }
    }
  }, [wagmiChainId]);

  return chainId;
}

function App() {
  const config = useConfig();
  // We're not using wagmiChainId directly anymore, so comment it out
  // const wagmiChainId = useChainId(); // Standard wagmi chainId (only works for supported chains)
  const realChainId = useRealChainId(); // Our custom chainId tracker that works for all chains
  const { address, status, isConnected } = useAccount();
  // Use the wallet's chain ID for balance, and ensure it updates when chain changes
  const { data: balanceData } = useBalance({
    address,
    chainId: realChainId, // Explicitly use the chain ID from the wallet
  });
  const { connectors, connect } = useConnect();

  // Determine if the current chain is supported
  const isChainSupported = realChainId ? config.chains.some((chain: any) => chain.id === realChainId) : false;

  // Track custom deployed contract address
  const [customContractAddress, setCustomContractAddress] = useState<`0x${string}` | undefined>(undefined);

  // Get possible contract addresses

  // Always check both legacy and createx addresses, regardless of network
  const legacyDisperseAddress = disperse_legacy.address as `0x${string}`;
  const createxDisperseAddress = disperse_createx.address as `0x${string}`;

  // Define the potential addresses to check (for debugging and display purposes)
  // Always include both disperse_legacy and disperse_createx addresses
  const potentialAddresses = [
    { address: legacyDisperseAddress, label: "legacy" },
    { address: createxDisperseAddress, label: "createx" },
    { address: customContractAddress, label: "custom" },
  ].filter((item) => !!item.address) as { address: `0x${string}`; label: string }[];

  // For debugging - show all potential addresses we're checking
  useEffect(() => {
    debug("Potential Disperse addresses:", potentialAddresses);
  }, [potentialAddresses, customContractAddress]);

  // Track if we're loading bytecode for any of the addresses
  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(true);

  // Track address verified as having a working Disperse contract
  const [verifiedAddress, setVerifiedAddress] = useState<{ address: `0x${string}`; label: string } | null>(null);

  // Track last verified chain to prevent redundant checks
  const lastCheckedChainIdRef = useRef<number | null>(null);

  // Check all potential addresses to find a valid Disperse contract
  // Only run once per chain ID change
  useEffect(() => {
    // Skip if we're already checking the current chain ID
    if (lastCheckedChainIdRef.current === realChainId) return;

    const checkAddresses = async () => {
      // Set as checking to avoid duplicate checks
      lastCheckedChainIdRef.current = realChainId !== undefined ? realChainId : null;
      setLoadingAddresses(true);
      debug(`Starting contract verification on chain ${realChainId}`);

      // Always check both legacy and createx addresses directly
      const allAddresses = [
        { address: legacyDisperseAddress, label: "legacy" },
        { address: createxDisperseAddress, label: "createx" },
        ...(customContractAddress ? [{ address: customContractAddress, label: "custom" }] : []),
      ];

      for (const addrInfo of allAddresses) {
        try {
          // Skip null or undefined addresses
          if (!addrInfo.address) continue;

          // Use the public client directly
          const provider = (window as any).ethereum;
          if (!provider) continue;

          debug(`Checking contract at ${addrInfo.label} address: ${addrInfo.address}`);

          // Simple direct request without retries
          const code = await provider
            .request({
              method: "eth_getCode",
              params: [addrInfo.address, "latest"],
            })
            .catch((err: any) => {
              console.warn(`Error checking bytecode for ${addrInfo.address}:`, err);
              return null;
            });

          console.log(
            `[DEBUG-CODE] Chain ${realChainId}, Address ${addrInfo.address}, Code length: ${code ? code.length : 0}`,
          );
          console.log(`[DEBUG-CODE] Code sample: ${code ? code.substring(0, 100) : "empty"}`);

          if (code && code !== "0x" && isDisperseContract(code)) {
            debug(`Found valid Disperse contract at ${addrInfo.label} address:`, addrInfo.address);
            setVerifiedAddress(addrInfo);
            setLoadingAddresses(false);
            return;
          }
        } catch (err) {
          console.error(`Error checking address ${addrInfo.address}:`, err);
        }
      }

      // If we got here, no valid contract was found
      debug(`No valid contract found on chain ${realChainId}`);
      setVerifiedAddress(null);
      setLoadingAddresses(false);
    };

    if (isConnected && realChainId) {
      checkAddresses();
    } else {
      setLoadingAddresses(false);
    }
  }, [customContractAddress, isConnected, realChainId]);

  // The address we'll be using for contract interactions
  const contractAddress = verifiedAddress?.address || legacyDisperseAddress; // Fallback to legacy address

  // Check if the contract address is in our list
  const hasContractAddress = !!contractAddress;

  // Whether a valid Disperse contract is deployed at one of our addresses
  const isContractDeployed = !!verifiedAddress;

  // Check if we can deploy to this network if needed
  const canDeploy = canDeployToNetwork(realChainId);

  // CreateX address is used for deployment

  // Use isBytecodeLoading when we're still checking addresses
  const isBytecodeLoading = loadingAddresses;

  // Contract deployment handling
  const handleContractDeployed = useCallback((address: `0x${string}`) => {
    setCustomContractAddress(address);
  }, []);

  // For debugging chain switching - only log significant changes
  useEffect(() => {
    if (realChainId) {
      console.log(`===== Chain ID changed to: ${realChainId} =====`);
      debug(`Current chainId is: ${realChainId}`, {
        chainName: networkName(realChainId),
        supported: isChainSupported,
        contracted: isContractDeployed,
        checking: loadingAddresses,
      });
    }
  }, [realChainId, isChainSupported, isContractDeployed, loadingAddresses]);

  // Log detailed contract status only when verification completes
  useEffect(() => {
    if (loadingAddresses === false) {
      debug("Contract verification complete", {
        hasContractAddress,
        potentialAddresses,
        verifiedAddress,
        contractAddress,
        isContractDeployed,
        canDeploy,
      });
    }
  }, [
    loadingAddresses,
    hasContractAddress,
    potentialAddresses,
    verifiedAddress,
    contractAddress,
    isContractDeployed,
    canDeploy,
  ]);

  const [appState, setAppState] = useState<AppState>(AppState.UNLOCK_WALLET); // Start with unlock state
  const [sending, setSending] = useState<"ether" | "token" | null>(null); // Start with null, will be set properly later
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [token, setToken] = useState<TokenInfo>({});
  const walletStatus = status === "connected" ? `logged in as ${address}` : "please unlock wallet";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Log state changes when they occur
  useEffect(() => {
    debug(`AppState changed to: ${AppState[appState]}`);
  }, [appState]);

  useEffect(() => {
    debug(`Sending type changed to: ${sending}`);
  }, [sending]);

  useEffect(() => {
    debug("Token updated:", token);
  }, [token]);

  // Create stable callback functions
  const parseAmounts = useCallback(() => {
    if (!textareaRef.current) return;
    debug("Parsing amounts from textarea");

    // Improved regex pattern that supports more address formats
    // Handles comma, equal sign, space, tab, and other separators between address and amount
    const pattern = /(0x[0-9a-fA-F]{40})[,\s=:;]+([0-9]+(?:\.[0-9]+)?)/g;
    const text = textareaRef.current.value;
    const newRecipients: Recipient[] = [];
    let result;

    // Make sure we have valid decimals before parsing
    const decimals = sending === "token" ? (token.decimals ?? 18) : 18;

    try {
      while ((result = pattern.exec(text)) !== null) {
        // Validate address more strictly
        const address = result[1].toLowerCase();
        if (isAddress(address)) {
          // Handle potential parseUnits errors
          try {
            newRecipients.push({
              address: address as `0x${string}`,
              value: parseUnits(result[2], decimals),
            });
          } catch (e) {
            debug(`Error parsing amount for address ${address}:`, e);
          }
        }
      }
    } catch (e) {
      debug("Error in regex parsing:", e);
    }

    debug(`Found ${newRecipients.length} recipients`, newRecipients);
    setRecipients(newRecipients);

    // Only update state if we found valid recipients and have the right prerequisites
    if (
      newRecipients.length &&
      (sending === "ether" || (sending === "token" && token.address && token.decimals !== undefined))
    ) {
      setAppState(AppState.ENTERED_AMOUNTS);
    }
  }, [sending, token.address, token.decimals]); // Include token.address in dependencies

  // Initialize default currency when component mounts
  useEffect(() => {
    // Set default currency to ether on initial load
    if (sending === null) {
      debug("Setting initial currency to ether");
      setSending("ether");
    }
  }, [sending]);

  // Update app state based on wallet connection
  useEffect(() => {
    if (status === "reconnecting" || status === "connecting") return;
    if (sending === null) return; // Wait until currency is initialized

    debug(
      `Wallet status: ${status}, isConnected: ${isConnected}, chainId: ${realChainId}, supported: ${isChainSupported}, contract: ${isContractDeployed}`,
    );

    if (status === "disconnected") {
      setAppState(AppState.UNLOCK_WALLET);
    } else if (isConnected && (!isContractDeployed || !isChainSupported)) {
      // Check if we're still loading contract bytecode
      if (isBytecodeLoading && hasContractAddress) {
        // Don't change state while checking contract
        return;
      }

      // Before showing the network unavailable message, check if we actually have a valid contract
      if (isContractDeployed) {
        // If we have a valid contract, skip the network unavailable message
        debug(`Chain ${realChainId} has a valid Disperse contract despite not being in our built-in list`);

        // Set to CONNECTED_TO_WALLET state and proceed as normal
        if (sending === "ether") {
          setAppState(AppState.SELECTED_CURRENCY);
          requestAnimationFrame(() => {
            if (textareaRef.current?.value) {
              parseAmounts();
            }
          });
        } else if (sending === "token") {
          if (token.address && token.decimals !== undefined && token.symbol) {
            setAppState(AppState.SELECTED_CURRENCY);
            requestAnimationFrame(() => {
              if (textareaRef.current?.value) {
                parseAmounts();
              }
            });
          } else {
            setAppState(AppState.CONNECTED_TO_WALLET);
          }
        }
        return;
      }

      // Otherwise, the chain isn't supported and contract not deployed
      debug(`Chain ${realChainId} is not fully supported or contract is not valid`);
      setAppState(AppState.NETWORK_UNAVAILABLE);
    } else if (isConnected) {
      if (sending === "ether") {
        // When connected with ether, we can go directly to the currency selection state
        setAppState(AppState.SELECTED_CURRENCY);
        // Call parseAmounts to update the recipient list after the next render
        requestAnimationFrame(() => {
          if (textareaRef.current?.value) {
            parseAmounts();
          }
        });
      } else if (sending === "token") {
        if (token.address && token.decimals !== undefined && token.symbol) {
          // If token is fully loaded, go to SELECTED_CURRENCY
          setAppState(AppState.SELECTED_CURRENCY);
          // Parse amounts after render
          requestAnimationFrame(() => {
            if (textareaRef.current?.value) {
              parseAmounts();
            }
          });
        } else {
          // With token not loaded, go to connected state until token is loaded
          setAppState(AppState.CONNECTED_TO_WALLET);
        }
      }
    }
  }, [
    status,
    isConnected,
    realChainId,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
    parseAmounts,
    sending,
    token,
  ]);

  // Define resetToken first before it's used
  const resetToken = useCallback(() => {
    debug("Resetting token");
    setToken({});
    setAppState(AppState.CONNECTED_TO_WALLET);
  }, []);

  const selectCurrency = useCallback(
    (type: "ether" | "token") => {
      debug(`Currency selected: ${type}`);

      // Set the sending type first
      setSending(type);

      if (type === "ether") {
        // For ether, we can immediately move to SELECTED_CURRENCY state
        setAppState(AppState.SELECTED_CURRENCY);
        // Then parse amounts if text exists
        if (textareaRef.current?.value) {
          // Use requestAnimationFrame to ensure DOM is updated
          requestAnimationFrame(() => {
            parseAmounts();
          });
        }
      } else if (type === "token") {
        if (token.address && token.decimals !== undefined && token.symbol) {
          // If we already have complete token data, use it
          // First set state to trigger re-render
          setAppState(AppState.SELECTED_CURRENCY);
          // Then parse amounts after render completes
          requestAnimationFrame(() => {
            parseAmounts();
          });
        } else {
          // Reset token state and go to wallet connected state for token selection
          resetToken();
        }
      }
    },
    [parseAmounts, token, resetToken],
  );

  const selectToken = useCallback(
    (tokenInfo: TokenInfo) => {
      debug("Token selected:", tokenInfo);

      // First update token state - this avoids race condition with parseAmounts
      setToken(tokenInfo);
      setSending("token");

      // Then update app state to trigger rendering
      setAppState(AppState.SELECTED_CURRENCY);

      // Instead of using setTimeout, use requestAnimationFrame for proper rendering sequence
      // This ensures DOM is updated before we try to parse amounts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            // Make sure we have token decimals before parsing
            if (tokenInfo.decimals !== undefined) {
              parseAmounts();
            }
          }
        });
      });
    },
    [parseAmounts],
  );

  // Get native currency name for display
  const getNativeCurrencyName = () => {
    return nativeCurrencyName(realChainId);
  };

  // Get symbol for display
  const getSymbol = () => {
    if (sending === "token") {
      return token.symbol || "???";
    }
    return nativeSymbol(realChainId);
  };

  // Get decimals for the current currency
  const getDecimals = () => {
    return sending === "token" ? (token.decimals ?? 18) : 18;
  };

  const getTotalAmount = () => {
    return recipients.reduce((total, recipient) => total + recipient.value, 0n);
  };

  const getBalance = () => {
    if (sending === "token") {
      return token.balance ?? 0n;
    }
    return balanceData?.value ?? 0n;
  };

  const getLeftAmount = () => {
    return getBalance() - getTotalAmount();
  };

  const getDisperseMessage = () => {
    if (sending === "token" && (token.allowance ?? 0n) < getTotalAmount()) {
      return "needs allowance";
    }
    if (getLeftAmount() < 0n) {
      return "total exceeds balance";
    }
    return undefined;
  };

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
              you have {formatUnits(balanceData?.value || 0n, 18)} {getNativeCurrencyName()}
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
            <p>enter one address and amount in {getSymbol()} on each line. supports any format.</p>
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
            symbol={getSymbol()}
            decimals={getDecimals()}
            balance={getBalance()}
            left={getLeftAmount()}
            total={getTotalAmount()}
          />
          {sending === "ether" && (
            <TransactionButton
              show={true}
              disabled={getLeftAmount() < 0n}
              title={`disperse ${getNativeCurrencyName()}`}
              action="disperseEther"
              message={getDisperseMessage()}
              chainId={realChainId}
              recipients={recipients}
              token={token}
              contractAddress={verifiedAddress?.address}
            />
          )}
        </section>
      )}

      {appState >= AppState.ENTERED_AMOUNTS && sending === "token" && (
        <div>
          <h2>allowance</h2>
          <p>
            {(token.allowance ?? 0n) < getTotalAmount()
              ? "allow smart contract to transfer tokens on your behalf."
              : "disperse contract has allowance, you can send tokens now."}
          </p>
          <TransactionButton
            title={(token.allowance ?? 0n) < getTotalAmount() ? "approve" : "revoke"}
            action={(token.allowance ?? 0n) < getTotalAmount() ? "approve" : "deny"}
            chainId={realChainId}
            recipients={recipients}
            token={token}
            contractAddress={verifiedAddress?.address}
            className={(token.allowance ?? 0n) >= getTotalAmount() ? "secondary" : ""}
          />
          <TransactionButton
            show={true}
            disabled={getLeftAmount() < 0n || (token.allowance ?? 0n) < getTotalAmount()}
            title="disperse token"
            action="disperseToken"
            message={getDisperseMessage()}
            chainId={realChainId}
            recipients={recipients}
            token={token}
            contractAddress={verifiedAddress?.address}
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
        tokenSymbol={token.symbol}
        recipientsCount={recipients.length}
      />
    </article>
  );
}

export default App;
