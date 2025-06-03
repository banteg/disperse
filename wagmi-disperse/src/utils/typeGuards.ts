import { isAddress } from "viem";
import type { Chain } from "wagmi/chains";

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
