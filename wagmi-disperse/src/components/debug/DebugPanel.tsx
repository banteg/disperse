import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { AppState } from "../../constants";
import { networkName } from "../../networks";
import { useStore } from "../../store";
import type { AddressInfo, VerifiedAddress, WindowWithEthereum } from "../../types";

interface DebugPanelProps {
  realChainId?: number;
  isChainSupported: boolean;
  hasContractAddress: boolean;
  isContractDeployed: boolean;
  isBytecodeLoading: boolean;
  verifiedAddress: VerifiedAddress | null;
  canDeploy: boolean;
  createxDisperseAddress: string;
  potentialAddresses: AddressInfo[];
  isConnected: boolean;
}

const DebugPanel = ({
  realChainId,
  isChainSupported,
  hasContractAddress,
  isContractDeployed,
  isBytecodeLoading,
  verifiedAddress,
  canDeploy,
  createxDisperseAddress,
  potentialAddresses,
  isConnected,
}: DebugPanelProps) => {
  const store = useStore();
  const { appState, sending, token, recipients, customContractAddress } = store;

  // State to track if debug panel should be shown
  const [showDebug, setShowDebug] = useState(false);
  const [activeTab, setActiveTab] = useState<"state" | "contract" | "token" | "recipients" | "store">("state");

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

  const tabStyle = (isActive: boolean) => ({
    padding: "4px 8px",
    cursor: "pointer",
    background: isActive ? "#333" : "#666",
    color: "#fff",
    border: "none",
    borderRadius: "4px 4px 0 0",
    fontSize: "11px",
    marginRight: "2px",
  });

  const renderStateTab = () => (
    <>
      <div>
        <strong>AppState:</strong>{" "}
        <span style={{ color: "#0066cc" }}>
          {AppState[appState]} ({appState})
        </span>
      </div>
      <div>
        <strong>Chain:</strong> {networkName(realChainId) || "Unknown"} (ID: {realChainId})
      </div>
      <div>
        <strong>Connection:</strong> {isConnected ? "✅ Connected" : "❌ Disconnected"}
      </div>
      <div>
        <strong>Chain Support:</strong> {isChainSupported ? "✅ Supported" : "❌ Not Supported"}
      </div>
      <div>
        <strong>Sending Mode:</strong> <span style={{ color: "#009900" }}>{sending || "none"}</span>
      </div>
    </>
  );

  const renderContractTab = () => (
    <>
      <div>
        <strong>Has Address:</strong> {hasContractAddress ? "✅ Yes" : "❌ No"}
      </div>
      <div>
        <strong>Contract Status:</strong> {isContractDeployed ? "✅ Deployed" : "❌ Not Found"}
        {isBytecodeLoading && " ⏳ (loading)"}
      </div>
      {verifiedAddress && (
        <>
          <div>
            <strong>Verified Address:</strong>
          </div>
          <div style={{ fontSize: "10px", wordBreak: "break-all" }}>{verifiedAddress.address}</div>
          <div style={{ fontSize: "10px" }}>Source: {verifiedAddress.label}</div>
        </>
      )}
      {customContractAddress && (
        <div>
          <strong>Custom Address:</strong> ✅ Set
        </div>
      )}
      <div>
        <strong>Can Deploy:</strong> {canDeploy ? "✅ Yes" : "❌ No"}
      </div>
      <div>
        <strong>CreateX Address:</strong>
        <div style={{ fontSize: "10px", wordBreak: "break-all" }}>{createxDisperseAddress}</div>
      </div>
      <div>
        <strong>Checked Locations:</strong>
        <div style={{ fontSize: "10px" }}>{potentialAddresses.map((a) => a.label).join(", ")}</div>
      </div>
    </>
  );

  const renderTokenTab = () => (
    <>
      {token.address ? (
        <>
          <div>
            <strong>Symbol:</strong> {token.symbol || "???"}
          </div>
          <div>
            <strong>Name:</strong> {token.name || "Unknown"}
          </div>
          <div>
            <strong>Decimals:</strong> {token.decimals ?? "?"}
          </div>
          <div>
            <strong>Address:</strong>
            <div style={{ fontSize: "10px", wordBreak: "break-all" }}>{token.address}</div>
          </div>
          {token.balance !== undefined && (
            <div>
              <strong>Balance:</strong> {formatUnits(token.balance, token.decimals || 18)}
            </div>
          )}
          {token.allowance !== undefined && (
            <div>
              <strong>Allowance:</strong> {formatUnits(token.allowance, token.decimals || 18)}
            </div>
          )}
        </>
      ) : (
        <div style={{ color: "#999" }}>No token selected</div>
      )}
    </>
  );

  const renderRecipientsTab = () => (
    <>
      <div>
        <strong>Count:</strong> {recipients.length}
      </div>
      {recipients.length > 0 && (
        <>
          <div>
            <strong>Total Amount:</strong>{" "}
            {formatUnits(
              recipients.reduce((sum, r) => sum + r.value, 0n),
              sending === "token" ? token.decimals || 18 : 18,
            )}
          </div>
          <div style={{ marginTop: "4px", maxHeight: "150px", overflowY: "auto" }}>
            {recipients.slice(0, 5).map((r, i) => (
              <div key={r.address} style={{ fontSize: "10px", marginBottom: "2px" }}>
                {i + 1}. {r.address.substring(0, 10)}...:{" "}
                {formatUnits(r.value, sending === "token" ? token.decimals || 18 : 18)}
              </div>
            ))}
            {recipients.length > 5 && <div style={{ fontSize: "10px" }}>...and {recipients.length - 5} more</div>}
          </div>
        </>
      )}
    </>
  );

  const renderStoreTab = () => {
    const storeState = useStore.getState();
    const relevantState = {
      appState: AppState[storeState.appState],
      sending: storeState.sending,
      hasToken: !!storeState.token.address,
      recipientsCount: storeState.recipients.length,
      customContract: !!storeState.customContractAddress,
    };

    return (
      <>
        <div>
          <strong>Store State:</strong>
        </div>
        <pre
          style={{
            fontSize: "10px",
            margin: "4px 0",
            padding: "4px",
            background: "#f5f5f5",
            borderRadius: "2px",
            overflow: "auto",
            maxHeight: "200px",
          }}
        >
          {JSON.stringify(relevantState, null, 2)}
        </pre>
        <div style={{ fontSize: "10px", marginTop: "4px" }}>
          <button
            type="button"
            onClick={() => console.log("Full store state:", storeState)}
            style={{
              padding: "2px 6px",
              fontSize: "10px",
              cursor: "pointer",
              background: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "2px",
            }}
          >
            Log Full State
          </button>
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "#f0f0f0",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 1000,
        width: "320px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", marginBottom: "8px", borderBottom: "1px solid #ddd" }}>
        <button type="button" style={tabStyle(activeTab === "state")} onClick={() => setActiveTab("state")}>
          State
        </button>
        <button type="button" style={tabStyle(activeTab === "contract")} onClick={() => setActiveTab("contract")}>
          Contract
        </button>
        <button type="button" style={tabStyle(activeTab === "token")} onClick={() => setActiveTab("token")}>
          Token
        </button>
        <button type="button" style={tabStyle(activeTab === "recipients")} onClick={() => setActiveTab("recipients")}>
          Recipients
        </button>
        <button type="button" style={tabStyle(activeTab === "store")} onClick={() => setActiveTab("store")}>
          Store
        </button>
      </div>

      <div style={{ padding: "10px" }}>
        {activeTab === "state" && renderStateTab()}
        {activeTab === "contract" && renderContractTab()}
        {activeTab === "token" && renderTokenTab()}
        {activeTab === "recipients" && renderRecipientsTab()}
        {activeTab === "store" && renderStoreTab()}

        <div
          style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px solid #ddd", fontSize: "10px", color: "#666" }}
        >
          <div>Console commands:</div>
          <code>toggleDisperseDebug()</code> - toggle panel
          <br />
          <code>enableDisperseDebug()</code> - show panel
          <br />
          <code>disableDisperseDebug()</code> - hide panel
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
