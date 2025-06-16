import { createConfig, http } from '@wagmi/core'
import { injected, metaMask, safe } from '@wagmi/connectors'
import { chains } from './networks'

// Create transports for each chain
const transports = chains.reduce((acc, chain) => {
  acc[chain.id] = http()
  return acc
}, {} as Record<number, ReturnType<typeof http>>)

export const config = createConfig({
  chains: chains as any, // Type assertion needed due to wagmi's strict chain typing
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