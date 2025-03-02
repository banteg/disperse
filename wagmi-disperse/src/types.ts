export interface TokenInfo {
  address?: `0x${string}`;
  name?: string;
  symbol?: string;
  decimals?: number;
  balance?: bigint;
  allowance?: bigint;
  contract?: any;
}

export interface Recipient {
  address: `0x${string}`;
  value: bigint;
}