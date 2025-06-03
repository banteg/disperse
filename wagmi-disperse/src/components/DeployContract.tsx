import { useEffect, useState } from "react";
import type { BaseError } from "viem";
import { useBytecode, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { disperse_createx } from "../deploy";
import { createXAbi } from "../generated";
import { explorerTx, networkName } from "../networks";

// CreateX is deployed at the same address on all chains
const CREATEX_ADDRESS = "0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed";

interface DeployContractProps {
  chainId?: number;
  onSuccess?: (address: `0x${string}`) => void;
}

const DeployContract = ({ chainId, onSuccess }: DeployContractProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deployedAddress, setDeployedAddress] = useState<`0x${string}` | null>(null);

  // Use CreateX to deploy the contract - use generic writeContract to set address for any chain
  const { writeContract, isPending, isError, error, data: contractWriteData } = useWriteContract();

  // Handle errors from writeContract hook
  useEffect(() => {
    if (isError && error && isDeploying) {
      // This catches "user rejected the request" errors when transaction is cancelled in wallet
      console.log("Deployment error detected:", error);
      setErrorMessage((error as BaseError).shortMessage || error.message || "Transaction rejected");
      setIsDeploying(false);
    }
  }, [isError, error, isDeploying]);

  // Set txHash when write operation completes
  useEffect(() => {
    if (contractWriteData) {
      setTxHash(contractWriteData);
    }
  }, [contractWriteData]);

  // Pre-compute expected address for verification
  const expectedAddress = disperse_createx.address as `0x${string}`;

  // Check if contract already exists at expected address - customize for speed
  const { data: bytecode, isLoading: isBytecodeLoading } = useBytecode({
    address: expectedAddress,
    chainId,
    query: {
      retry: false,
    },
  });

  // Check if CreateX exists at the expected address
  const { data: createXBytecode, isLoading: isCreateXLoading } = useBytecode({
    address: CREATEX_ADDRESS as `0x${string}`,
    chainId,
    query: {
      retry: false,
    },
  });

  // Flag for whether the contract is already deployed at the expected address
  const isAlreadyDeployed = bytecode && bytecode !== "0x";
  // Flag for whether CreateX is deployed on this network
  const isCreateXDeployed = createXBytecode && createXBytecode !== "0x";

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  });

  // Handle transaction errors
  useEffect(() => {
    if (txError && txHash) {
      console.log("Transaction error detected:", txError);
      setErrorMessage((txError as BaseError).shortMessage || txError.message || "Transaction failed");
      setIsDeploying(false);
    }
  }, [txError, txHash]);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setErrorMessage("");

    // If contract is already deployed at expected address, just notify success
    if (isAlreadyDeployed) {
      console.log("Contract already deployed at expected address:", expectedAddress);
      setDeployedAddress(expectedAddress);
      onSuccess?.(expectedAddress);
      setIsDeploying(false);
      return;
    }

    // Check if CreateX is deployed
    if (!isCreateXDeployed) {
      setErrorMessage(
        "CreateX factory not deployed on this network. Visit github.com/pcaversaccio/createx to deploy it first.",
      );
      setIsDeploying(false);
      return;
    }

    try {
      // Deploy using CreateX's deployCreate2 for deterministic address
      writeContract({
        abi: createXAbi,
        address: CREATEX_ADDRESS as `0x${string}`,
        functionName: "deployCreate2",
        args: [disperse_createx.salt as `0x${string}`, disperse_createx.initcode as `0x${string}`],
      });
    } catch (error: unknown) {
      console.error("Deployment error:", error);
      setErrorMessage((error as BaseError)?.shortMessage || (error as Error)?.message || "Deployment failed");
      setIsDeploying(false);
    }
  };

  // Improve loading UI to provide a better user experience
  const isCheckingContract = isBytecodeLoading || isCreateXLoading;

  // Add console log to track loading duration
  if (isCheckingContract) {
    console.log("[DEPLOY] Checking contract bytecode at address:", expectedAddress);
    console.log("[DEPLOY] Checking CreateX bytecode at address:", CREATEX_ADDRESS);
  }

  return (
    <div className="deploy-contract">
      <h2>deploy disperse contract</h2>

      {isCheckingContract ? (
        <div className="checking">
          <p>checking if disperse contract is already deployed...</p>
        </div>
      ) : isAlreadyDeployed ? (
        <div>
          <p>
            a disperse contract was found on {networkName(chainId)?.toLowerCase() || "this network"} at the expected
            address. you can use it directly.
          </p>
          <div className="success">
            contract address: <span className="contract-address">{expectedAddress}</span>
          </div>
          <div className="deployed-info">
            <button type="button" onClick={() => window.location.reload()}>
              reload page
            </button>
          </div>
        </div>
      ) : !isCreateXDeployed ? (
        <div>
          <p>
            cannot deploy disperse on {networkName(chainId)?.toLowerCase() || "this network"} because the CreateX
            factory is not deployed.
          </p>
          <div className="failed">
            you need to deploy CreateX first. visit{" "}
            <a href="https://github.com/pcaversaccio/createx" target="_blank" rel="noopener noreferrer">
              github.com/pcaversaccio/createx
            </a>{" "}
            for instructions.
          </div>
        </div>
      ) : (
        <>
          <p>
            deploy the contract yourself using deterministic deployment. it will have the same address on any network.
          </p>

          <div className="transaction-button">
            <input
              type="submit"
              value="deploy contract"
              onClick={handleDeploy}
              disabled={isDeploying || isConfirming || isPending || isError}
            />

            <div className="status">
              {isDeploying && <div className="pending">preparing deployment...</div>}
              {isPending && <div className="pending">confirm in wallet...</div>}
              {isConfirming && <div className="pending">deploying contract...</div>}
              {isConfirmed && !deployedAddress && <div className="pending">finalizing deployment...</div>}
              {isConfirmed && deployedAddress && (
                <div className="success">
                  contract deployed to: <span className="contract-address">{deployedAddress}</span>
                </div>
              )}
              {errorMessage && <div className="failed">{errorMessage}</div>}
              {txHash && (
                <div className="hash">
                  <a href={explorerTx(txHash, chainId)} target="_blank" rel="noopener noreferrer">
                    {txHash}
                  </a>
                </div>
              )}
            </div>
          </div>

          {isConfirmed && deployedAddress && (
            <div className="deployed-info">
              <p>
                contract deployed successfully! you can now use disperse on this network. reload the page to start using
                the app with your newly deployed contract.
              </p>
              <button type="button" onClick={() => window.location.reload()}>
                reload page
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeployContract;
