export const networks = {
  1: {
    name: "mainnet",
    unit: "ETH",
    explorer: {
      base: 'https://etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  3: {
    name: "ropsten",
    unit: "ETH",
    explorer: {
      base: 'https://ropsten.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  42: {
    name: "kovan",
    unit: "KETH",
    explorer: {
      base: 'https://kovan.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  4: {
    name: "rinkeby",
    unit: "ETH",
    explorer: {
      base: 'https://rinkeby.etherscan.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  61: {
    name: "etc mainnet",
    unit: "ETC",
    explorer: {
      base: 'https://gastracker.io/',
      tx: tx => `tx/${tx}`,
      addr: addr => `addr/${addr}`,
    },
  },
  99: {
    name: "poa network",
    unit: "POA",
    explorer: {
      base: 'https://blockscout.com/poa/core/',
      tx: tx => `tx/${tx}`,
      addr: addr => `address/${addr}`,
    },
  },
  5777: {
    name: "ganache",
    unit: "ETH",
  }
};

export function explorer_tx(tx) {
  let network = networks[web3.version.network]
  if (network && network.explorer) {
    return  `${network.explorer.base}${network.explorer.tx(tx)}`
  }
}

export function explorer_addr(addr) {
  let network = networks[web3.version.network]
  if (network && network.explorer) {
    return  `${network.explorer.base}${network.explorer.addr(addr)}`
  }
}

export function network_name() {
  let network = web3.version.network
  if (!network) return
  return networks[network] ? networks[network].name : '🤔'
}
