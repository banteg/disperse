import type { Chain } from "wagmi/chains";

// Import all chains from wagmi
import * as allWagmiChains from "wagmi/chains";

// Convert imported chains to an array
const allChains = Object.values(allWagmiChains);

// Get a chain by ID, using all available wagmi chains
export function getChainById(chainId: number | undefined): Chain | undefined {
  if (!chainId) return undefined;

  // Try all chains from wagmi
  return allChains.find((chain) => chain.id === chainId);
}

export function explorerTx(tx: string | undefined, chainId: number | undefined) {
  if (!tx || !chainId) return;
  const chain = getChainById(chainId);
  if (chain?.blockExplorers?.default) {
    return `${chain.blockExplorers.default.url}/tx/${tx}`;
  }
}

export function explorerAddr(addr: string | undefined, chainId: number | undefined) {
  if (!addr || !chainId) return;
  const chain = getChainById(chainId);
  if (chain?.blockExplorers?.default) {
    return `${chain.blockExplorers.default.url}/address/${addr}`;
  }
}

export function explorerName(chainId: number | undefined) {
  if (!chainId) return;
  const chain = getChainById(chainId);
  if (chain?.blockExplorers?.default) {
    return chain.blockExplorers.default.name;
  }
}

export function networkName(chainId: number | undefined) {
  if (!chainId) return;

  const chain = getChainById(chainId);

  if (chain) {
    return chain.name;
  }

  return `network ${chainId}`;
}

export function nativeSymbol(chainId: number | undefined) {
  if (!chainId) return "ETH";

  const chain = getChainById(chainId);
  if (chain) {
    return chain.nativeCurrency.symbol;
  }

  // Default for unknown chains
  return "ETH";
}

// Get the chain's native currency name
export function nativeCurrencyName(chainId: number | undefined) {
  if (!chainId) return "ether";

  const chain = getChainById(chainId);
  if (chain) {
    return chain.nativeCurrency.name.toLowerCase();
  }

  // Default for unknown chains
  return "ether";
}

// Get chain ID by name - useful for debugging and configuration
export function getChainIdByName(name: string): number | undefined {
  const chainByName = allChains.find((chain) => chain.name.toLowerCase() === name.toLowerCase());
  return chainByName?.id;
}
