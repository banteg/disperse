import { disperse_createx, disperse_legacy, disperse_runtime } from "../deploy";

/**
 * Check if bytecode starts with the expected Disperse contract runtime
 * This performs verification to protect against malicious contracts
 *
 * @param bytecode Contract bytecode to check
 * @returns true if the bytecode starts with the Disperse runtime
 */
export function isDisperseContract(bytecode: string | undefined): boolean {
  const DEBUG = import.meta.env.DEV;
  const debug = (msg: string) => {
    if (!DEBUG) return;
    console.log(`[CONTRACT-VERIFY] ${msg}`);
  };

  // Skip verification if we've already checked this bytecode
  // Use a static cache to avoid repeated checks during rendering
  const bytecodeCache =
    (isDisperseContract as typeof isDisperseContract & { cache?: Map<string, boolean> }).cache ||
    new Map<string, boolean>();
  (isDisperseContract as typeof isDisperseContract & { cache: Map<string, boolean> }).cache = bytecodeCache;

  if (bytecode && bytecodeCache.has(bytecode)) {
    const result = bytecodeCache.get(bytecode);
    return result ?? false;
  }

  // Check if bytecode is empty or undefined
  if (!bytecode || bytecode === "0x") {
    debug("Bytecode is empty or 0x");
    return false;
  }

  // Remove "0x" prefix for comparison if present and convert to lowercase for case-insensitive comparison
  const cleanBytecode = (bytecode.startsWith("0x") ? bytecode.substring(2) : bytecode).toLowerCase();
  const cleanRuntime = (
    disperse_runtime.startsWith("0x") ? disperse_runtime.substring(2) : disperse_runtime
  ).toLowerCase();

  // Check if the bytecode starts with our runtime
  const runtimeLength = cleanRuntime.length;
  const bytecodePrefix = cleanBytecode.substring(0, runtimeLength);
  const startsWithRuntime = bytecodePrefix === cleanRuntime;

  // Check different match types
  const isExactMatch = cleanBytecode === cleanRuntime;

  let result = false;

  if (isExactMatch) {
    result = true;
  } else if (startsWithRuntime) {
    result = true;
  } else {
    debug(
      `Bytecode mismatch. Runtime length: ${cleanRuntime.length}, Bytecode length: ${cleanBytecode.length}`,
    );
    result = false;
  }

  // Cache the result before returning
  if (bytecode) {
    bytecodeCache.set(bytecode, result);
  }
  return result;
}

/**
 * Get the Disperse contract addresses to check for deployment
 * We check both the legacy address and the CreateX deployed address
 */
export const getDisperseAddresses = (): { address: string; label: string }[] => {
  return [
    { address: disperse_legacy.address, label: "legacy" },
    { address: disperse_createx.address, label: "createx" },
  ];
};

/**
 * Check if we can deploy on this network
 * @param chainId Network chain ID
 * @returns true if deployment is allowed on this network
 */
export function canDeployToNetwork(chainId: number | undefined): boolean {
  if (!chainId) return false;

  // Allow deployment on any EVM-compatible chain
  // We're assuming that if the chain ID is available, it's an EVM chain
  // that should support contract deployment
  return true;

  // Alternatively, you could have a blocklist of chains where deployment is known to be problematic:
  /*
  const unsupportedChains = [
    // List chains that are either non-EVM or have issues with deployment
    // For example, some Layer 2 solutions might have specific deployment requirements
  ];
  
  return !unsupportedChains.includes(chainId);
  */
}
