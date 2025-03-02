export const networks = {
  1: {
    name: "mainnet",
    symbol: "ETH",
    explorer: {
      name: "etherscan",
      base: "https://etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  3: {
    name: "ropsten",
    symbol: "ETH",
    explorer: {
      name: "etherscan",
      base: "https://ropsten.etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  42: {
    name: "kovan",
    symbol: "KETH",
    explorer: {
      name: "etherscan",
      base: "https://kovan.etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  56: {
    name: "bsc mainnet",
    symbol: "BNB",
    explorer: {
      name: "bscscan",
      base: "https://bscscan.com/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  4: {
    name: "rinkeby",
    symbol: "ETH",
    explorer: {
      name: "etherscan",
      base: "https://rinkeby.etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  5: {
    name: "görli",
    symbol: "ETH",
    explorer: {
      name: "etherscan",
      base: "https://goerli.etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  61: {
    name: "etc mainnet",
    symbol: "ETC",
    explorer: {
      name: "blockscout",
      base: "https://blockscout.com/etc/mainnet",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  77: {
    name: "poa sokol",
    symbol: "SPOA",
    explorer: {
      name: "blockscout",
      base: "https://blockscout.com/poa/sokol/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  99: {
    name: "poa network",
    symbol: "POA",
    explorer: {
      name: "blockscout",
      base: "https://blockscout.com/poa/core/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  100: {
    name: "xdai chain",
    symbol: "xDAI",
    explorer: {
      name: "blockscout",
      base: "https://blockscout.com/poa/dai/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  137: {
    name: "matic network",
    symbol: "MATIC",
    explorer: {
      name: "matic explorer",
      base: "https://explorer.matic.network/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  163: {
    name: "lightstreams",
    symbol: "PHT",
    explorer: {
      name: "explorer",
      base: "https://explorer.lightstreams.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `addr/${addr}`,
    },
  },
  250: {
    name: "fantom",
    symbol: "FTM",
    explorer: {
      name: "ftmscan",
      base: "https://ftmscan.com/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  5777: {
    name: "ganache",
    symbol: "ETH",
  },
  42161: {
    name: "arbitrum",
    symbol: "ETH",
    explorer: {
      name: "arbiscan",
      base: "https://arbiscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  4689: {
    name: "iotex",
    symbol: "IOTX",
    explorer: {
      name: "iotexscout",
      base: "https://iotexscout.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  1284: {
    name: "moonbeam",
    symbol: "GLMR",
    explorer: {
      name: "blockscout",
      base: "https://moonbeam.moonscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  1285: {
    name: "moonriver",
    symbol: "MOVR",
    explorer: {
      name: "blockscout",
      base: "https://blockscout.moonriver.moonbeam.network/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  42220: {
    name: "celo",
    symbol: "CELO",
    explorer: {
      name: "explorer",
      base: "https://explorer.celo.org/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  1666600000: {
    name: "harmony",
    symbol: "ONE",
    explorer: {
      name: "explorer",
      base: "https://explorer.harmony.one/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  60: {
    name: "gochain",
    symbol: "GO",
    explorer: {
      name: "explorer",
      base: "https://explorer.gochain.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  128: {
    name: "huobi",
    symbol: "HT",
    explorer: {
      name: "hecoinfo",
      base: "https://hecoinfo.com/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  66: {
    name: "okex",
    symbol: "OKT",
    explorer: {
      name: "oklink",
      base: "https://www.oklink.com/okexchain/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  10: {
    name: "optimism",
    symbol: "ETH",
    explorer: {
      name: "etherscan",
      base: "https://optimistic.etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  84531: {
    name: "base goerli",
    symbol: "ETH",
    explorer: {
      name: "basescan",
      base: "https://goerli.basescan.org/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  1101: {
    name: "polygon zkevm",
    symbol: "ETH",
    explorer: {
      name: "polygonscan",
      base: "https://zkevm.polygonscan.com/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  8453: {
    name: "base",
    symbol: "ETH",
    explorer: {
      name: "basescan",
      base: "https://basescan.org/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  11155111: {
    name: "sepolia",
    symbol: "ETH",
    explorer: {
      name: "etherscan",
      base: "https://sepolia.etherscan.io/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
  314: {
    name: "filecoin",
    symbol: "FIL",
    explorer: {
      name: "filfox",
      base: "https://filfox.info/en/",
      tx: (tx: string) => `tx/${tx}`,
      addr: (addr: string) => `address/${addr}`,
    },
  },
} as const;

export function explorerTx(tx: string | undefined, chainId: number | undefined) {
  if (!tx || !chainId) return;
  const network = networks[chainId as keyof typeof networks];
  if (network && network.explorer) {
    return `${network.explorer.base}${network.explorer.tx(tx)}`;
  }
}

export function explorerAddr(addr: string | undefined, chainId: number | undefined) {
  if (!addr || !chainId) return;
  const network = networks[chainId as keyof typeof networks];
  if (network && network.explorer) {
    return `${network.explorer.base}${network.explorer.addr(addr)}`;
  }
}

export function explorerName(chainId: number | undefined) {
  if (!chainId) return;
  const network = networks[chainId as keyof typeof networks];
  if (network && network.explorer) {
    return network.explorer.name;
  }
}

export function networkName(chainId: number | undefined) {
  if (!chainId) return;
  return chainId in networks ? networks[chainId as keyof typeof networks].name : "🤔";
}

export function nativeSymbol(chainId: number | undefined) {
  if (!chainId) return "ETH";
  const network = networks[chainId as keyof typeof networks];
  return network ? network.symbol : "ETH";
}