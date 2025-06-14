import { networkName } from "../networks";
import DeployContract from "./DeployContract";

interface NetworkStatusProps {
  chainId: number | undefined;
  isBytecodeLoading: boolean;
  isContractDeployed: boolean;
  isConnected: boolean;
  verifiedAddress?: { address: `0x${string}`; label: string } | null;
  onContractDeployed: (address: `0x${string}`) => void;
}

export default function NetworkStatus({
  chainId,
  isBytecodeLoading,
  isContractDeployed,
  isConnected,
  verifiedAddress,
  onContractDeployed,
}: NetworkStatusProps) {
  return (
    <section>
      <h2>unsupported network</h2>
      {isBytecodeLoading ? (
        <p>
          <span className="checking">checking if disperse contract is deployed on any address...</span>
        </p>
      ) : isContractDeployed ? (
        <>
          <p>
            disperse contract found at {verifiedAddress?.label} address, but this network isn't configured yet in our
            app. reload the page to try again.
          </p>
          <div className="success">
            <p>valid contract address: {verifiedAddress?.address}</p>
          </div>
          <button type="button" onClick={() => window.location.reload()}>
            reload page
          </button>
        </>
      ) : !isConnected ? (
        <p>connect your wallet to deploy the disperse contract on this network.</p>
      ) : (
        <>
          <p>
            no disperse contract found on <em>{networkName(chainId)?.toLowerCase() || "this network"}</em>. you can
            deploy it yourself.
          </p>
          <DeployContract chainId={chainId} onSuccess={onContractDeployed} />
        </>
      )}

      <div className="network-info">
        <p>
          network: {networkName(chainId)?.toLowerCase() || "unknown"} (id: {chainId})
        </p>
        {verifiedAddress && (
          <p>
            verified contract: {verifiedAddress.address}
            <span className="badge">{verifiedAddress.label}</span>
          </p>
        )}
      </div>
    </section>
  );
}
