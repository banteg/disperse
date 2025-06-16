import { formatUnits, parseUnits, isAddress } from "viem";
import { nativeCurrencyName, nativeSymbol, type Chain } from "./networks";
import type { Recipient, TokenInfo } from "./types";

// Balance Calculations
export function getTotalAmount(recipients: Recipient[]): bigint {
  return recipients.reduce((total, recipient) => total + recipient.value, 0n);
}

export function getBalance(
  sending: "ether" | "token" | null,
  token: TokenInfo,
  balanceData?: { value: bigint },
): bigint {
  if (sending === "token") {
    return token.balance ?? 0n;
  }
  return balanceData?.value ?? 0n;
}

export function getLeftAmount(
  recipients: Recipient[],
  sending: "ether" | "token" | null,
  token: TokenInfo,
  balanceData?: { value: bigint },
): bigint {
  return getBalance(sending, token, balanceData) - getTotalAmount(recipients);
}

export function getDisperseMessage(
  recipients: Recipient[],
  sending: "ether" | "token" | null,
  token: TokenInfo,
  balanceData?: { value: bigint },
): string | undefined {
  if (sending === "token" && (token.allowance ?? 0n) < getTotalAmount(recipients)) {
    return "needs allowance";
  }
  if (getLeftAmount(recipients, sending, token, balanceData) < 0n) {
    return "total exceeds balance";
  }
  return undefined;
}

export function getNativeCurrencyName(realChainId: number | undefined): string {
  return nativeCurrencyName(realChainId);
}

export function getSymbol(
  sending: "ether" | "token" | null,
  token: TokenInfo,
  realChainId: number | undefined,
): string {
  if (sending === "token") {
    return token.symbol || "???";
  }
  return nativeSymbol(realChainId);
}

export function getDecimals(sending: "ether" | "token" | null, token: TokenInfo): number {
  return sending === "token" ? (token.decimals ?? 18) : 18;
}

export function formatBalance(balance: bigint, decimals: number, symbol: string): string {
  return `${formatUnits(balance, decimals)} ${symbol}`;
}

// Contract Verification
// Deploy constants
export const disperse_runtime =
  "608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806351ba162c1461005c578063c73a2d60146100cf578063e63d38ed14610142575b600080fd5b34801561006857600080fd5b506100cd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610188565b005b3480156100db57600080fd5b50610140600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610309565b005b6101866004803603810190808035906020019082018035906020019190919293919293908035906020019082018035906020019190919293919293905050506105b0565b005b60008090505b84849050811015610301578573ffffffffffffffffffffffffffffffffffffffff166323b872dd3387878581811015156101c457fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868681811015156101ef57fe5b905060200201356040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156102ae57600080fd5b505af11580156102c2573d6000803e3d6000fd5b505050506040513d60208110156102d857600080fd5b810190808051906020019092919050505015156102f457600080fd5b808060010191505061018e565b505050505050565b60008060009150600090505b8585905081101561034657838382818110151561032e57fe5b90506020020135820191508080600101915050610315565b8673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561041d57600080fd5b505af1158015610431573d6000803e3d6000fd5b505050506040513d602081101561044757600080fd5b8101908080519060200190929190505050151561046357600080fd5b600090505b858590508110156105a7578673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb878784818110151561049d57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868581811015156104c857fe5b905060200201356040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561055457600080fd5b505af1158015610568573d6000803e3d6000fd5b505050506040513d602081101561057e57600080fd5b8101908080519060200190929190505050151561059a57600080fd5b8080600101915050610468565b50505050505050565b600080600091505b858590508210156106555785858381811015156105d157fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc858585818110151561061557fe5b905060200201359081150290604051600060405180830381858888f19350505050158015610647573d6000803e3d6000fd5b5081806001019250506105b8565b3073ffffffffffffffffffffffffffffffffffffffff1631905060008111156106c0573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156106be573d6000803e3d6000fd5b505b5050505050505600";

export const disperse_legacy = {
  address: "0xD152f549545093347A162Dce210e7293f1452150",
  runtime: disperse_runtime,
};

export const disperse_createx = {
  salt: "0xfd73487f4e6544007a3ce4000000000000000000000000000000000000000000",
  initcode:
    "0x608060405234801561001057600080fd5b506106f4806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806351ba162c1461005c578063c73a2d60146100cf578063e63d38ed14610142575b600080fd5b34801561006857600080fd5b506100cd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610188565b005b3480156100db57600080fd5b50610140600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610309565b005b6101866004803603810190808035906020019082018035906020019190919293919293908035906020019082018035906020019190919293919293905050506105b0565b005b60008090505b84849050811015610301578573ffffffffffffffffffffffffffffffffffffffff166323b872dd3387878581811015156101c457fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868681811015156101ef57fe5b905060200201356040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156102ae57600080fd5b505af11580156102c2573d6000803e3d6000fd5b505050506040513d60208110156102d857600080fd5b810190808051906020019092919050505015156102f457600080fd5b808060010191505061018e565b505050505050565b60008060009150600090505b8585905081101561034657838382818110151561032e57fe5b90506020020135820191508080600101915050610315565b8673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561041d57600080fd5b505af1158015610431573d6000803e3d6000fd5b505050506040513d602081101561044757600080fd5b8101908080519060200190929190505050151561046357600080fd5b600090505b858590508110156105a7578673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb878784818110151561049d57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868581811015156104c857fe5b905060200201356040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561055457600080fd5b505af1158015610568573d6000803e3d6000fd5b505050506040513d602081101561057e57600080fd5b8101908080519060200190929190505050151561059a57600080fd5b8080600101915050610468565b50505050505050565b600080600091505b858590508210156106555785858381811015156105d157fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc858585818110151561061557fe5b905060200201359081150290604051600060405180830381858888f19350505050158015610647573d6000803e3d6000fd5b5081806001019250506105b8565b3073ffffffffffffffffffffffffffffffffffffffff1631905060008111156106c0573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156106be573d6000803e3d6000fd5b505b5050505050505600a165627a7a723058204f25a733917e0bf639cd1e101d55bd927f843fb395fb2a963a7909c09ae023ed0029",
  address: "0xd15fE25eD0Dba12fE05e7029C88b10C25e8880E3",
  runtime: disperse_runtime,
};

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
  debug(`Bytecode sample: ${bytecode ? `${bytecode.substring(0, 50)}...` : "undefined"}`);
  debug(`Runtime type: ${typeof disperse_runtime}`);
  debug(`Runtime length: ${disperse_runtime ? disperse_runtime.length : "undefined"}`);
  debug(`Runtime sample: ${disperse_runtime ? `${disperse_runtime.substring(0, 50)}...` : "undefined"}`);

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

  // Remove "0x" prefix for comparison if present and convert to lowercase for case-insensitive comparison
  const cleanBytecode = (bytecode.startsWith("0x") ? bytecode.substring(2) : bytecode).toLowerCase();
  const cleanRuntime = (
    disperse_runtime.startsWith("0x") ? disperse_runtime.substring(2) : disperse_runtime
  ).toLowerCase();

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

// Error Handling
export class BaseError extends Error {
  shortMessage?: string;
  constructor(message: string, shortMessage?: string) {
    super(message);
    this.shortMessage = shortMessage;
  }
}

export function formatError(error: unknown): string {
  if (error instanceof BaseError) {
    return error.shortMessage || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}

export function isUserRejection(error: unknown): boolean {
  if (error instanceof BaseError) {
    return error.message.includes("User rejected") || error.message.includes("User denied");
  }
  if (error instanceof Error) {
    return error.message.includes("User rejected") || error.message.includes("User denied");
  }
  return false;
}

// Parse Recipients
const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

export function parseRecipients(text: string, decimals: number): Recipient[] {
  debug("Parsing amounts from textarea");

  const pattern = /(0x[0-9a-fA-F]{40})[,\s=:;]+([0-9]+(?:\.[0-9]+)?)/g;
  const newRecipients: Recipient[] = [];
  let result: RegExpExecArray | null;

  try {
    result = pattern.exec(text);
    while (result !== null) {
      const address = result[1].toLowerCase();
      if (isAddress(address)) {
        try {
          newRecipients.push({
            address: address as `0x${string}`,
            value: parseUnits(result[2], decimals),
          });
        } catch (e) {
          debug(`Error parsing amount for address ${address}:`, e);
        }
      }
      result = pattern.exec(text);
    }
  } catch (e) {
    debug("Error in regex parsing:", e);
  }

  debug(`Found ${newRecipients.length} recipients`, newRecipients);
  return newRecipients;
}

// Type Guards
export function isValidAddress(address: string): address is `0x${string}` {
  return isAddress(address);
}

export function isValidChain(chain: unknown): chain is Chain {
  return (
    typeof chain === "object" &&
    chain !== null &&
    "id" in chain &&
    typeof (chain as Record<string, unknown>).id === "number" &&
    "name" in chain &&
    typeof (chain as Record<string, unknown>).name === "string" &&
    "nativeCurrency" in chain &&
    typeof (chain as Record<string, unknown>).nativeCurrency === "object"
  );
}

export function hasProperty<T extends object, K extends PropertyKey>(obj: T, key: K): obj is T & Record<K, unknown> {
  return key in obj;
}