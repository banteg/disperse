import { createConfig, http } from '@wagmi/core'
import { injected, metaMask, safe } from '@wagmi/connectors'
import { anvil } from 'viem/chains'
import { chains } from './networks'
import { tevm } from './connectors/tevm'
import { local } from './connectors/local'

// Add anvil to chains if not already included
const allChains = chains.find(c => c.id === anvil.id) ? chains : [...chains, anvil]

// Create transports for each chain
const transports = allChains.reduce((acc, chain) => {
  acc[chain.id] = http()
  return acc
}, {} as Record<number, ReturnType<typeof http>>)

export const config = createConfig({
  chains: allChains as any, // Type assertion needed due to wagmi's strict chain typing
  connectors: [
    injected(),
    metaMask(),
    safe(),
    tevm({ name: 'TEVM (In-Memory)' }),
    local({ chain: anvil, name: 'Anvil (Local)' }),
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