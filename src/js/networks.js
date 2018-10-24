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
  5777: {
    name: "ganache",
    symbol: "ETH",
  }
};

export function explorer_tx(tx) {
  if (!addr) return
  let network = networks[web3.version.network]
  if (network && network.explorer) {
    return  `${network.explorer.base}${network.explorer.tx(tx)}`
  }
}

export function explorer_addr(addr) {
  if (!addr) return
  let network = networks[web3.version.network]
  if (network && network.explorer) {
    return  `${network.explorer.base}${network.explorer.addr(addr)}`
  }
}

export function explorer_name() {
  let network = networks[web3.version.network]
  if (network && network.explorer) {
    return network.explorer.name
  }
}

export function network_name() {
  let network = web3.version.network
  if (!network) return
  return networks[network] ? networks[network].name : '🤔'
}

export function native_symbol() {
  let network = networks[web3.version.network]
  return network ? network.symbol : 'ETH'
}
