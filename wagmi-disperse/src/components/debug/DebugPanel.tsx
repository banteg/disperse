import { useEffect, useState } from "react";
import { AppState } from "../../constants";
import { networkName } from "../../networks";

interface DebugPanelProps {
  appState: AppState;
  realChainId?: number;
  isChainSupported: boolean;
  hasContractAddress: boolean;
  customContractAddress?: `0x${string}`;
  isContractDeployed: boolean;
  isBytecodeLoading: boolean;
  verifiedAddress: { address: `0x${string}`; label: string } | null;
  canDeploy: boolean;
  createxDisperseAddress: string;
  potentialAddresses: { address: string; label: string }[];
  sending: string | null;
  isConnected: boolean;
  tokenSymbol?: string;
  recipientsCount: number;
}

const DebugPanel = ({
  appState,
  realChainId,
  isChainSupported,
  hasContractAddress,
  customContractAddress,
  isContractDeployed,
  isBytecodeLoading,
  verifiedAddress,
  canDeploy,
  createxDisperseAddress,
  potentialAddresses,
  sending,
  isConnected,
  tokenSymbol,
  recipientsCount,
}: DebugPanelProps) => {
  // State to track if debug panel should be shown
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Check if in development environment using import.meta.env for Vite
    const isDev = import.meta.env.DEV;

    // Initialize based on environment
    setShowDebug(isDev);

    // Add a global function to toggle debug panel
    (window as any).toggleDisperseDebug = () => {
      setShowDebug((prevState) => {
        const newState = !prevState;
        console.log(`Debug panel ${newState ? "enabled" : "disabled"}`);
        return newState;
      });
    };

    // Add a global function to enable debug panel
    (window as any).enableDisperseDebug = () => {
      setShowDebug(true);
      console.log("Debug panel enabled");
    };

    // Add a global function to disable debug panel
    (window as any).disableDisperseDebug = () => {
      setShowDebug(false);
      console.log("Debug panel disabled");
    };

    return () => {
      // Clean up global functions
      delete (window as any).toggleDisperseDebug;
      delete (window as any).enableDisperseDebug;
      delete (window as any).disableDisperseDebug;
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
        <strong>Chain:</strong> {networkName(realChainId) || "Unknown"} ({realChainId})
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
      {verifiedAddress && (
        <div>
          <strong>Verified At:</strong> {verifiedAddress.label} ({verifiedAddress.address.substring(0, 8)}...)
        </div>
      )}
      <div>
        <strong>Can Deploy:</strong> {canDeploy ? "Yes" : "No"}
      </div>
      <div>
        <strong>Deployment Addr:</strong> {createxDisperseAddress.substring(0, 8)}...
      </div>
      <div>
        <strong>Checked:</strong> {potentialAddresses.map((a) => a.label).join(", ")}
      </div>
      <div>
        <strong>Sending:</strong> {sending}
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
