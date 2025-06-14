import { useEffect, useState, useMemo } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { AppState } from "../../constants";
import { useContractVerification } from "../../hooks/useContractVerification";
import { networkName } from "../../networks";
import { useAppStore } from "../../store/appStore";
import type { WindowWithEthereum } from "../../types"; // AddressInfo, VerifiedAddress might not be needed if sourced from hook
import { canDeployToNetwork } from "../../utils/contractVerify";


const DebugPanel = () => {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const config = useConfig();

  const appState = useAppStore((state) => state.appState);
  const customContractAddress = useAppStore((state) => state.customContractAddress);
  const storeVerifiedAddress = useAppStore((state) => state.verifiedAddress); // Main verified address from store
  const sending = useAppStore((state) => state.sending);
  const token = useAppStore((state) => state.token);
  const recipients = useAppStore((state) => state.recipients);

  const {
    verifiedAddress, // This will be local to DebugPanel's hook instance
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
  } = useContractVerification(chainId, isConnected, customContractAddress);

  // Use storeVerifiedAddress for display if available, otherwise the hook's.
  // This is because storeVerifiedAddress reflects what App.tsx decided is the active one.
  const displayVerifiedAddress = storeVerifiedAddress || verifiedAddress;

  const isChainSupported = useMemo(() => chainId ? config.chains.some((chain) => chain.id === chainId) : false, [chainId, config.chains]);
  const canDeploy = useMemo(() => canDeployToNetwork(chainId), [chainId]);
  const tokenSymbol = useMemo(() => token?.symbol, [token]);
  const recipientsCount = useMemo(() => recipients.length, [recipients]);

  // State to track if debug panel should be shown
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Check if in development environment using import.meta.env for Vite
    const isDev = import.meta.env.DEV;

    // Initialize based on environment
    setShowDebug(isDev);

    // Add a global function to toggle debug panel
    const windowExt = window as WindowWithEthereum & {
      toggleDisperseDebug?: () => void;
      enableDisperseDebug?: () => void;
      disableDisperseDebug?: () => void;
    };

    windowExt.toggleDisperseDebug = () => {
      setShowDebug((prevState) => {
        const newState = !prevState;
        console.log(`Debug panel ${newState ? "enabled" : "disabled"}`);
        return newState;
      });
    };

    // Add a global function to enable debug panel
    windowExt.enableDisperseDebug = () => {
      setShowDebug(true);
      console.log("Debug panel enabled");
    };

    // Add a global function to disable debug panel
    windowExt.disableDisperseDebug = () => {
      setShowDebug(false);
      console.log("Debug panel disabled");
    };

    return () => {
      // Clean up global functions
      windowExt.toggleDisperseDebug = undefined;
      windowExt.enableDisperseDebug = undefined;
      windowExt.disableDisperseDebug = undefined;
    };
  }, []);

  if (!showDebug) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "#f0f0f0",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 1000,
        maxWidth: "300px",
      }}
    >
      <div>
        <strong>AppState:</strong> {AppState[appState]}
      </div>
      <div>
        <strong>Chain:</strong> {networkName(chainId) || "Unknown"} ({chainId})
      </div>
      <div>
        <strong>Supported:</strong> {isChainSupported ? "Yes" : "No"}
      </div>
      <div>
        <strong>Has Address:</strong> {hasContractAddress ? "Yes" : "No"}
        {customContractAddress ? " (custom)" : ""}
      </div>
      <div>
        <strong>Contract Status:</strong> {isContractDeployed ? "Deployed" : "Not Found"}
        {isBytecodeLoading ? " (loading)" : ""}
      </div>
      {displayVerifiedAddress && (
        <div>
          <strong>Verified At:</strong> {displayVerifiedAddress.label} ({displayVerifiedAddress.address.substring(0, 8)}...)
        </div>
      )}
      <div>
        <strong>Can Deploy:</strong> {canDeploy ? "Yes" : "No"}
      </div>
      <div>
        <strong>Deployment Addr:</strong> {createxDisperseAddress ? createxDisperseAddress.substring(0, 8) : "N/A"}...
      </div>
      <div>
        <strong>Checked:</strong> {potentialAddresses.map((a) => a.label).join(", ")}
      </div>
      <div>
        <strong>Sending:</strong> {sending || "N/A"}
      </div>
      <div>
        <strong>Connected:</strong> {isConnected ? "Yes" : "No"}
      </div>
      <div>
        <strong>Token:</strong> {tokenSymbol || "None"}
      </div>
      <div>
        <strong>Recipients:</strong> {recipientsCount}
      </div>
      <div style={{ marginTop: "8px", fontSize: "10px", color: "#666" }}>
        Type <code>toggleDisperseDebug()</code> in console to toggle
      </div>
    </div>
  );
};

export default DebugPanel;
