import { createConfig, http } from '@wagmi/core'
import { injected, walletConnect, metaMask, safe } from '@wagmi/connectors'
import { chains } from './networks'
import type { Chain } from 'viem'

// Convert our custom chain format to viem chain format
const viemChains = chains.map(chain => ({
  id: chain.id,
  name: chain.name,
  network: chain.name.toLowerCase().replace(/\s+/g, ''),
  nativeCurrency: chain.nativeCurrency,
  rpcUrls: {
    default: { http: chain.rpcUrls }
  },
  blockExplorers: chain.blockExplorers ? {
    default: {
      name: chain.blockExplorers[0].name,
      url: chain.blockExplorers[0].url
    }
  } : undefined,
  testnet: chain.testnet
})) as readonly [Chain, ...Chain[]]

// Create transports for each chain
const transports = viemChains.reduce((acc, chain) => {
  acc[chain.id] = http()
  return acc
}, {} as Record<number, ReturnType<typeof http>>)

export const config = createConfig({
  chains: viemChains,
  connectors: [
    injected(),
    metaMask(),
    safe(),
    // Note: WalletConnect requires a projectId which should be provided via env vars
    // walletConnect({
    //   projectId: import.meta.env.VITE_WC_PROJECT_ID,
    // }),
  ],
  transports,
})

declare module '@wagmi/core' {
  interface Register {
    config: typeof config
  }
}