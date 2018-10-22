export const networks = {
  1: {
    name: "mainnet",
    unit: "ETH",
    explorer: tx => `https://etherscan.io/tx/${tx}`
  },
  3: {
    name: "ropsten",
    unit: "ETH",
    explorer: tx => `https://ropsten.etherscan.io/tx/${tx}`
  },
  42: {
    name: "kovan",
    unit: "KETH",
    explorer: tx => `https://kovan.etherscan.io/tx/${tx}`
  },
  4: {
    name: "rinkeby",
    unit: "ETH",
    explorer: tx => `https://rinkeby.etherscan.io/tx/${tx}`
  },
  61: {
    name: "etc mainnet",
    unit: "ETC",
    explorer: tx => `https://gastracker.io/tx/${tx}`
  },
  99: {
    name: "poa network",
    unit: "POA",
    explorer: tx => `https://blockscout.com/poa/core/tx/${tx}/`
  },
  5777: {
    name: "ganache",
    unit: "ETH",
    explorer: tx => "#"
  }
};

export function etherscan(tx) {
  return networks[web3.version.network].explorer(tx)
}
