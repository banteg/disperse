export const networks = {
  1: {
    name: "mainnet",
    symbol: "ETH",
    explorer: {
      name: 'etherscan',
      base: 'https://etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  3: {
    name: "ropsten",
    symbol: "ETH",
    explorer: {
      name: 'etherscan',
      base: 'https://ropsten.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  42: {
    name: "kovan",
    symbol: "KETH",
    explorer: {
      name: 'etherscan',
      base: 'https://kovan.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  56: {
    name: "bsc mainnet",
    symbol: "BNB",
    explorer: {
      name: 'bscscan',
      base: 'https://bscscan.com/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  4: {
    name: "rinkeby",
    symbol: "ETH",
    explorer: {
      name: 'etherscan',
      base: 'https://rinkeby.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  5: {
    name: "görli",
    symbol: "ETH",
    explorer: {
      name: 'etherscan',
      base: 'https://goerli.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  61: {
    name: "etc mainnet",
    symbol: "ETC",
    explorer: {
      name: 'blockscout',
      base: 'https://blockscout.com/etc/mainnet',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  77: {
    name: "poa sokol",
    symbol: "SPOA",
    explorer: {
      name: 'blockscout',
      base: 'https://blockscout.com/poa/sokol/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  99: {
    name: "poa network",
    symbol: "POA",
    explorer: {
      name: 'blockscout',
      base: 'https://blockscout.com/poa/core/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  100: {
    name: "xdai chain",
    symbol: "xDAI",
    explorer: {
      name: 'blockscout',
      base: 'https://blockscout.com/poa/dai/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  137: {
    name: "matic network",
    symbol: "MATIC",
    explorer: {
      name: 'matic explorer',
      base: 'https://explorer.matic.network/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  163: {
    name: "lightstreams",
    symbol: "PHT",
    explorer: {
      name: 'explorer',
      base: 'https://explorer.lightstreams.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `addr/${addr}`,
    },
  },
  250: {
    name: "fantom",
    symbol: "FTM",
    explorer: {
      name: 'ftmscan',
      base: 'https://ftmscan.com/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
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
      name: 'arbiscan',
      base: 'https://arbiscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  4689: {
    name: "iotex",
    symbol: "IOTX",
    explorer: {
      name: 'iotexscout',
      base: 'https://iotexscout.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  1285: {
    name: "moonriver",
    symbol: "MOON",
    explorer: {
      name: 'blockscout',
      base: 'https://blockscout.moonriver.moonbeam.network/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
};

export function explorer_tx(tx) {
  if (!tx) return
  let network = networks[chain_id]
  if (network && network.explorer) {
    return  `${network.explorer.base}${network.explorer.tx(tx)}`
  }
}

export function explorer_addr(addr) {
  if (!addr) return
  let network = networks[chain_id]
  if (network && network.explorer) {
    return  `${network.explorer.base}${network.explorer.addr(addr)}`
  }
}

export function explorer_name() {
  let network = networks[chain_id]
  if (network && network.explorer) {
    return network.explorer.name
  }
}

export function network_name() {
  if (!chain_id) return
  return networks[chain_id] ? networks[chain_id].name : '🤔'
}

export function native_symbol() {
  let network = networks[chain_id]
  return network ? network.symbol : 'ETH'
}
