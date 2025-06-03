import { disperse_createx, disperse_legacy, disperse_runtime } from "../deploy";

/**
 * Check if bytecode starts with the expected Disperse contract runtime
 * This performs verification to protect against malicious contracts
 *
 * @param bytecode Contract bytecode to check
 * @returns true if the bytecode starts with the Disperse runtime
 */
export function isDisperseContract(bytecode: string | undefined): boolean {
  // For debugging - use a more specific tag to easily filter logs
  const debug = (msg: string) => console.log(`[CONTRACT-VERIFY] ${msg}`);

  // Print debugging information
  debug("------------------------------------------------------------");
  debug(`Bytecode type: ${typeof bytecode}`);
  debug(`Bytecode length: ${bytecode ? bytecode.length : "undefined"}`);
  debug(`Bytecode sample: ${bytecode ? bytecode.substring(0, 50) + "..." : "undefined"}`);
  debug(`Runtime type: ${typeof disperse_runtime}`);
  debug(`Runtime length: ${disperse_runtime ? disperse_runtime.length : "undefined"}`);
  debug(`Runtime sample: ${disperse_runtime ? disperse_runtime.substring(0, 50) + "..." : "undefined"}`);

  // Skip verification if we've already checked this bytecode
  // Use a static cache to avoid repeated checks during rendering
  const bytecodeCache =
    (isDisperseContract as typeof isDisperseContract & { cache?: Map<string, boolean> }).cache ||
    new Map<string, boolean>();
  (isDisperseContract as typeof isDisperseContract & { cache: Map<string, boolean> }).cache = bytecodeCache;

  if (bytecode && bytecodeCache.has(bytecode)) {
    const result = bytecodeCache.get(bytecode);
    debug(`Using cached result for bytecode: ${result ? "✅ VALID" : "❌ INVALID"}`);
    return result ?? false;
  }

  // Check if bytecode is empty or undefined
  if (!bytecode || bytecode === "0x") {
    debug("❌ Bytecode is empty or 0x");
    return false;
  }

  // Remove "0x" prefix for comparison if present
  const cleanBytecode = bytecode.startsWith("0x") ? bytecode.substring(2) : bytecode;
  const cleanRuntime = disperse_runtime.startsWith("0x") ? disperse_runtime.substring(2) : disperse_runtime;

  debug(`Clean bytecode length: ${cleanBytecode.length}`);
  debug(`Clean runtime length: ${cleanRuntime.length}`);

  // Check if the bytecode starts with our runtime
  const runtimeLength = cleanRuntime.length;
  const bytecodePrefix = cleanBytecode.substring(0, runtimeLength);
  const startsWithRuntime = bytecodePrefix === cleanRuntime;

  // Check exact match byte by byte (for debugging purposes)
  let firstDiffIndex = -1;
  for (let i = 0; i < Math.min(cleanBytecode.length, cleanRuntime.length); i++) {
    if (cleanBytecode[i] !== cleanRuntime[i]) {
      firstDiffIndex = i;
      break;
    }
  }

  debug(`First difference at index: ${firstDiffIndex}`);
  if (firstDiffIndex >= 0) {
    const start = Math.max(0, firstDiffIndex - 10);
    const end = Math.min(cleanBytecode.length, firstDiffIndex + 10);
    debug(`Context (expected): ${cleanRuntime.substring(start, end)}`);
    debug(`Context (actual): ${cleanBytecode.substring(start, end)}`);
  }

  // Check different match types
  const isExactMatch = cleanBytecode === cleanRuntime;
  debug(`Is exact match: ${isExactMatch}`);
  debug(`Starts with runtime: ${startsWithRuntime}`);

  let result = false;

  if (isExactMatch) {
    debug("✅ EXACT MATCH: Runtime bytecode matches exactly");
    result = true;
  } else if (startsWithRuntime) {
    debug("✅ PREFIX MATCH: Bytecode starts with expected runtime");
    result = true;
  } else {
    debug("❌ NO MATCH: Bytecode does not match expected Disperse contract");
    debug(`Expected prefix: ${cleanRuntime.substring(0, 64)}`);
    debug(`Found prefix: ${cleanBytecode.substring(0, 64)}`);
    result = false;
  }

  // Cache the result before returning
  if (bytecode) {
    bytecodeCache.set(bytecode, result);
  }
  debug(`Final result: ${result}`);
  debug("------------------------------------------------------------");
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
