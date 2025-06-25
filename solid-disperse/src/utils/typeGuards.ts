import { isAddress } from "viem";

export function isValidAddress(address: string): address is `0x${string}` {
  return isAddress(address);
}
