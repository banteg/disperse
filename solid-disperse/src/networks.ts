import * as allChains from 'viem/chains'

// Export the Chain type from viem
export type { Chain } from 'viem/chains'

// Filter to get only valid chains (excludes non-chain exports)
function isValidChain(chain: unknown): chain is allChains.Chain {
  return (
    typeof chain === 'object' &&
    chain !== null &&
    'id' in chain &&
    typeof (chain as any).id === 'number' &&
    'name' in chain &&
    typeof (chain as any).name === 'string'
  )
}

// Convert to array and filter out non-chain exports
const chainsArray = Object.values(allChains).filter(isValidChain)

// Export chains as array for compatibility with existing code
export const chains = chainsArray

// Get a chain by ID
export function getChainById(chainId: number | undefined): allChains.Chain | undefined {
  if (!chainId) return undefined
  return chainsArray.find(chain => chain.id === chainId)
}

export function explorerTx(tx: string | undefined, chainId: number | undefined) {
  if (!tx || !chainId) return
  const chain = getChainById(chainId)
  if (chain?.blockExplorers?.default) {
    return `${chain.blockExplorers.default.url}/tx/${tx}`
  }
}

export function explorerAddr(addr: string | undefined, chainId: number | undefined) {
  if (!addr || !chainId) return
  const chain = getChainById(chainId)
  if (chain?.blockExplorers?.default) {
    return `${chain.blockExplorers.default.url}/address/${addr}`
  }
}

export function explorerName(chainId: number | undefined) {
  if (!chainId) return
  const chain = getChainById(chainId)
  return chain?.blockExplorers?.default?.name
}

export function networkName(chainId: number | undefined) {
  if (!chainId) return

  const chain = getChainById(chainId)
  if (chain) {
    return chain.name
  }

  return `network ${chainId}`
}

export function nativeSymbol(chainId: number | undefined) {
  if (!chainId) return 'ETH'

  const chain = getChainById(chainId)
  if (chain) {
    return chain.nativeCurrency.symbol
  }

  // Default for unknown chains
  return 'ETH'
}

// Get the chain's native currency name
export function nativeCurrencyName(chainId: number | undefined) {
  if (!chainId) return 'ether'

  const chain = getChainById(chainId)
  if (chain) {
    return chain.nativeCurrency.name.toLowerCase()
  }

  // Default for unknown chains
  return 'ether'
}

// Get chain ID by name - useful for debugging and configuration
export function getChainIdByName(name: string): number | undefined {
  const chain = chainsArray.find((chain) => chain.name.toLowerCase() === name.toLowerCase())
  return chain?.id
}