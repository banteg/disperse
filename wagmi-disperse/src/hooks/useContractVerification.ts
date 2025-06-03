import { useCallback, useEffect, useRef, useState } from "react";
import { useBytecode } from "wagmi";
import { disperse_createx, disperse_legacy } from "../deploy";
import type { AddressInfo, VerifiedAddress } from "../types";
import { isDisperseContract } from "../utils/contractVerify";

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

export function useContractVerification(
  realChainId: number | undefined,
  isConnected: boolean,
  customContractAddress?: `0x${string}`,
) {
  const [verifiedAddress, setVerifiedAddress] = useState<VerifiedAddress | null>(null);
  const [currentCheckIndex, setCurrentCheckIndex] = useState(0);
  const lastCheckedChainIdRef = useRef<number | null>(null);

  const legacyDisperseAddress = disperse_legacy.address as `0x${string}`;
  const createxDisperseAddress = disperse_createx.address as `0x${string}`;

  const potentialAddresses = [
    { address: legacyDisperseAddress, label: "legacy" },
    { address: createxDisperseAddress, label: "createx" },
    { address: customContractAddress, label: "custom" },
  ].filter((item) => !!item.address) as AddressInfo[];

  const addressToCheck = potentialAddresses[currentCheckIndex]?.address;

  const { data: bytecode, isLoading: isBytecodeLoading } = useBytecode({
    address: addressToCheck,
    chainId: realChainId,
    query: {
      enabled: !!addressToCheck && !!realChainId && isConnected,
    },
  });

  useEffect(() => {
    debug("Potential Disperse addresses:", potentialAddresses);
  }, [potentialAddresses, customContractAddress]);

  useEffect(() => {
    if (lastCheckedChainIdRef.current !== realChainId) {
      lastCheckedChainIdRef.current = realChainId !== undefined ? realChainId : null;
      setVerifiedAddress(null);
      setCurrentCheckIndex(0);
    }
  }, [realChainId]);

  useEffect(() => {
    if (!addressToCheck || isBytecodeLoading || !isConnected || !realChainId) return;

    const currentAddress = potentialAddresses[currentCheckIndex];
    if (!currentAddress) return;

    debug(`Checking contract at ${currentAddress.label} address: ${currentAddress.address}`);

    const codeString = bytecode;
    console.log(
      `[DEBUG-CODE] Chain ${realChainId}, Address ${currentAddress.address}, Code length: ${codeString ? codeString.length : 0}`,
    );
    console.log(`[DEBUG-CODE] Code sample: ${codeString ? codeString.substring(0, 100) : "empty"}`);

    if (codeString && codeString !== "0x" && isDisperseContract(codeString)) {
      debug(`Found valid Disperse contract at ${currentAddress.label} address:`, currentAddress.address);
      setVerifiedAddress(currentAddress);
      return;
    }

    if (currentCheckIndex < potentialAddresses.length - 1) {
      setCurrentCheckIndex(currentCheckIndex + 1);
    } else {
      debug(`No valid contract found on chain ${realChainId}`);
      setVerifiedAddress(null);
    }
  }, [bytecode, isBytecodeLoading, addressToCheck, currentCheckIndex, potentialAddresses, isConnected, realChainId]);

  const contractAddress = verifiedAddress?.address || legacyDisperseAddress;
  const hasContractAddress = !!contractAddress;
  const isContractDeployed = !!verifiedAddress;
  const loadingAddresses = isBytecodeLoading && !verifiedAddress;

  const handleContractDeployed = useCallback((_address: `0x${string}`) => {
    // This would be passed back to the parent component to update customContractAddress
  }, []);

  return {
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading: loadingAddresses,
    potentialAddresses,
    legacyDisperseAddress,
    createxDisperseAddress,
    handleContractDeployed,
  };
}
