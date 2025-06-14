import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { BaseError } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { erc20 } from "../contracts";
import { disperse_legacy } from "../deploy";
import { disperseAbi } from "../generated";
import { explorerTx } from "../networks";
import { useContract, useCurrency, useTransaction, useWallet } from "../store";
import type { Recipient, TokenInfo } from "../types";
import { formatError } from "../utils/errors";

interface TransactionButtonProps {
  show?: boolean;
  disabled?: boolean;
  title: string;
  action: "disperseEther" | "disperseToken" | "approve" | "deny";
  message?: string;
  chainId?: number; // Optional, uses store by default
  recipients?: Recipient[]; // Optional, uses store by default
  token?: TokenInfo; // Optional, uses store by default
  contractAddress?: `0x${string}`; // Optional, uses store by default
  className?: string; // Additional class names for styling
  account?: `0x${string}`; // Optional, uses store by default
}

const TransactionButton = ({
  show = true,
  disabled = false,
  title,
  action,
  message,
  chainId: propChainId,
  recipients: propRecipients,
  token: propToken,
  contractAddress: propContractAddress,
  className = "",
  account: propAccount,
}: TransactionButtonProps) => {
  // Get data from store
  const { token: storeToken } = useCurrency();
  const { recipients: storeRecipients } = useTransaction();
  const { verifiedAddress } = useContract();
  const { chainId: storeChainId, address: storeAccount } = useWallet();

  // Use props with store fallbacks
  const chainId = propChainId || storeChainId;
  const recipients = propRecipients || storeRecipients;
  const token = propToken || storeToken;
  const contractAddress = propContractAddress || verifiedAddress?.address;
  const account = propAccount || storeAccount;
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  // Fall back to legacy address if no contract address is available
  const deployedAddress = contractAddress || (disperse_legacy.address as `0x${string}`);

  // Always consider the contract deployed if we're showing the button
  // The parent component (App.tsx) only shows this button when a contract is verified
  const isContractDeployed = true;
  const isBytecodeLoading = false;

  // Use generic writeContract for all operations so we can explicitly set the chainId and address
  const { writeContract, isPending: isWritePending, isError: isWriteError, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  });

  // Update error message when write fails with user-friendly error format
  useEffect(() => {
    if (isWriteError && writeError) {
      setErrorMessage((writeError as BaseError).shortMessage || writeError.message || "Transaction failed");
    }
  }, [isWriteError, writeError]);

  // Invalidate queries after successful transactions
  useEffect(() => {
    if (isConfirmed && account) {
      if (action === "approve" || action === "deny") {
        // Invalidate allowance queries to refetch fresh data
        if (token.address && deployedAddress) {
          queryClient.invalidateQueries({
            queryKey: [
              "readContract",
              {
                address: token.address,
                functionName: "allowance",
                args: [account, deployedAddress],
                chainId,
              },
            ],
          });
          console.log(`[TransactionButton] Invalidated allowance queries for ${action} transaction`);
        }
      }

      if (action === "disperseToken" || action === "approve" || action === "deny") {
        // Invalidate balance queries for token transactions
        if (token.address) {
          queryClient.invalidateQueries({
            queryKey: [
              "readContract",
              {
                address: token.address,
                functionName: "balanceOf",
                args: [account],
                chainId,
              },
            ],
          });
          console.log(`[TransactionButton] Invalidated token balance queries for ${action} transaction`);
        }
      }

      if (action === "disperseEther") {
        // Invalidate ETH balance queries for ether transactions
        queryClient.invalidateQueries({
          queryKey: ["balance", { address: account, chainId }],
        });
        console.log(`[TransactionButton] Invalidated ETH balance queries for ${action} transaction`);
      }
    }
  }, [isConfirmed, action, token.address, account, deployedAddress, chainId, queryClient]);

  const handleClick = async () => {
    setErrorMessage("");

    if (!deployedAddress) {
      setErrorMessage("Disperse contract address not available for this network");
      return;
    }

    // TypeScript: deployedAddress is guaranteed to be non-null after this check
    const contractAddr = deployedAddress as `0x${string}`;

    if (isBytecodeLoading) {
      setErrorMessage("Checking if Disperse contract is deployed...");
      return;
    }

    if (!isContractDeployed) {
      setErrorMessage("Disperse contract not deployed at the expected address");
      return;
    }

    try {
      if (action === "disperseEther") {
        writeContract(
          {
            address: contractAddr,
            abi: disperseAbi,
            functionName: "disperseEther",
            args: [recipients.map((r) => r.address), recipients.map((r) => r.value)],
            value: recipients.reduce((sum, r: Recipient) => BigInt(sum) + r.value, BigInt(0)),
          },
          {
            onSuccess(hash) {
              setTxHash(hash);
            },
            onError(error) {
              setErrorMessage(formatError(error));
            },
          },
        );
      } else if (action === "disperseToken" && token.address) {
        writeContract(
          {
            address: contractAddr,
            abi: disperseAbi,
            functionName: "disperseToken",
            args: [token.address, recipients.map((r) => r.address), recipients.map((r) => r.value)],
          },
          {
            onSuccess(hash) {
              setTxHash(hash);
            },
            onError(error) {
              setErrorMessage(formatError(error));
            },
          },
        );
      } else if (action === "approve" && token.address) {
        writeContract(
          {
            address: token.address,
            abi: erc20.abi,
            functionName: "approve",
            args: [
              contractAddr,
              BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), // MaxUint256
            ],
          },
          {
            onSuccess(hash) {
              setTxHash(hash);
            },
            onError(error) {
              setErrorMessage(formatError(error));
            },
          },
        );
      } else if (action === "deny" && token.address) {
        writeContract(
          {
            address: token.address,
            abi: erc20.abi,
            functionName: "approve",
            args: [contractAddr, 0n],
          },
          {
            onSuccess(hash) {
              setTxHash(hash);
            },
            onError(error) {
              setErrorMessage(formatError(error));
            },
          },
        );
      }
    } catch (error: unknown) {
      console.error("Transaction error:", error);
      setErrorMessage((error as BaseError)?.shortMessage || (error as Error)?.message || "Transaction failed");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`transaction-button ${className}`}>
      <input
        type="submit"
        value={title}
        onClick={handleClick}
        disabled={disabled || isWritePending || isConfirming || isBytecodeLoading || !isContractDeployed}
      />
      <div className="status">
        {message && <div>{message}</div>}
        {isBytecodeLoading && <div className="pending">checking if disperse contract is deployed...</div>}
        {!isBytecodeLoading && !isContractDeployed && !errorMessage && (
          <div className="failed">disperse contract not deployed</div>
        )}
        {isWritePending && <div className="pending">sign transaction with wallet</div>}
        {isConfirming && <div className="pending">transaction pending</div>}
        {isConfirmed && <div className="success">transaction success</div>}
        {errorMessage && <div className="failed">{errorMessage}</div>}
        {txHash && (
          <a className="hash" href={explorerTx(txHash, chainId)} target="_blank" rel="noopener noreferrer">
            {txHash}
          </a>
        )}
      </div>
    </div>
  );
};

export default TransactionButton;
