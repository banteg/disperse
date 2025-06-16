// Chain configuration for SolidJS
// This is adapted from wagmi chains but made standalone

export interface Chain {
  id: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers?: {
    name: string;
    url: string;
  }[];
  testnet?: boolean;
}

// Define common chains as a record for easy lookup
const chainsRecord: Record<number, Chain> = {
  1: {
    id: 1,
    name: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://eth.public-rpc.com"],
    blockExplorers: [
      { name: "Etherscan", url: "https://etherscan.io" },
    ],
    testnet: false,
  },
  5: {
    id: 5,
    name: "Goerli",
    nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://goerli.infura.io/v3/"],
    blockExplorers: [
      { name: "Etherscan", url: "https://goerli.etherscan.io" },
    ],
    testnet: true,
  },
  10: {
    id: 10,
    name: "Optimism",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorers: [
      { name: "Optimistic Etherscan", url: "https://optimistic.etherscan.io" },
    ],
    testnet: false,
  },
  56: {
    id: 56,
    name: "BNB Smart Chain",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorers: [
      { name: "BscScan", url: "https://bscscan.com" },
    ],
    testnet: false,
  },
  100: {
    id: 100,
    name: "Gnosis",
    nativeCurrency: { name: "xDAI", symbol: "xDAI", decimals: 18 },
    rpcUrls: ["https://rpc.gnosischain.com"],
    blockExplorers: [
      { name: "Gnosisscan", url: "https://gnosisscan.io" },
    ],
    testnet: false,
  },
  137: {
    id: 137,
    name: "Polygon",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorers: [
      { name: "PolygonScan", url: "https://polygonscan.com" },
    ],
    testnet: false,
  },
  250: {
    id: 250,
    name: "Fantom",
    nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorers: [
      { name: "FTMScan", url: "https://ftmscan.com" },
    ],
    testnet: false,
  },
  8453: {
    id: 8453,
    name: "Base",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorers: [
      { name: "Basescan", url: "https://basescan.org" },
    ],
    testnet: false,
  },
  42161: {
    id: 42161,
    name: "Arbitrum One",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorers: [
      { name: "Arbiscan", url: "https://arbiscan.io" },
    ],
    testnet: false,
  },
  11155111: {
    id: 11155111,
    name: "Sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorers: [
      { name: "Etherscan", url: "https://sepolia.etherscan.io" },
    ],
    testnet: true,
  },
};

// Get a chain by ID
export function getChainById(chainId: number | undefined): Chain | undefined {
  if (!chainId) return undefined;
  return chainsRecord[chainId];
}

export function explorerTx(tx: string | undefined, chainId: number | undefined) {
  if (!tx || !chainId) return;
  const chain = getChainById(chainId);
  if (chain?.blockExplorers && chain.blockExplorers.length > 0) {
    return `${chain.blockExplorers[0].url}/tx/${tx}`;
  }
}

export function explorerAddr(addr: string | undefined, chainId: number | undefined) {
  if (!addr || !chainId) return;
  const chain = getChainById(chainId);
  if (chain?.blockExplorers && chain.blockExplorers.length > 0) {
    return `${chain.blockExplorers[0].url}/address/${addr}`;
  }
}

export function explorerName(chainId: number | undefined) {
  if (!chainId) return;
  const chain = getChainById(chainId);
  if (chain?.blockExplorers && chain.blockExplorers.length > 0) {
    return chain.blockExplorers[0].name;
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

// Export chains as array for easier iteration
export const chains: Chain[] = Object.values(chainsRecord);

// Get chain ID by name - useful for debugging and configuration
export function getChainIdByName(name: string): number | undefined {
  const chainsArray = Object.values(chainsRecord);
  const chainByName = chainsArray.find((chain) => chain.name.toLowerCase() === name.toLowerCase());
  return chainByName?.id;
}