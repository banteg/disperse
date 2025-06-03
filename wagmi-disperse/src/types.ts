export interface TokenInfo {
  address?: `0x${string}`;
  name?: string;
  symbol?: string;
  decimals?: number;
  balance?: bigint;
  allowance?: bigint;
  contract?: Record<string, unknown>;
}

export interface Recipient {
  address: `0x${string}`;
  value: bigint;
}

export interface VerifiedAddress {
  address: `0x${string}`;
  label: string;
}

export interface AddressInfo {
  address: `0x${string}`;
  label: string;
}

export interface DeploymentConfig {
  abi: readonly unknown[];
  address: `0x${string}`;
  functionName: string;
  args: readonly unknown[];
}

export interface EthereumProvider {
  request: (params: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (data: unknown) => void) => void;
  removeListener?: (event: string, handler: (data: unknown) => void) => void;
}

export interface WindowWithEthereum extends Window {
  ethereum?: EthereumProvider;
}

export interface DebugData {
  [key: string]: unknown;
}

export type DebugParam = unknown;
