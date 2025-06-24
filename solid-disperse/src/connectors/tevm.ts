import { createConnector } from '@wagmi/core'
import { createMemoryClient } from '@tevm/memory-client'
import type { Chain } from 'viem'

export interface TevmConnectorOptions {
  chain?: Chain
  name?: string
}

export function tevm(options: TevmConnectorOptions = {}) {
  const { name = 'TEVM', chain } = options

  return createConnector((config) => ({
    id: 'tevm',
    name,
    type: 'tevm' as const,
    
    async connect() {
      const accounts = await this.getAccounts()
      const chainId = await this.getChainId()
      
      return {
        accounts,
        chainId,
      }
    },
    
    async disconnect() {
      // No cleanup needed for memory client
    },
    
    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = await provider.request({ method: 'eth_accounts' })
      return accounts as `0x${string}`[]
    },
    
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = await provider.request({ method: 'eth_chainId' })
      return Number(chainId)
    },
    
    async getProvider() {
      const memoryClient = createMemoryClient({
        fork: chain ? {
          transport: config.getClient({ chainId: chain.id }).transport,
        } : undefined,
      })
      
      // Return the EIP-1193 provider
      return memoryClient
    },
    
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return accounts.length > 0
      } catch {
        return false
      }
    },
    
    async switchChain({ chainId }: { chainId: number }) {
      throw new Error('TEVM connector does not support chain switching')
    },
    
    onAccountsChanged(_accounts: string[]) {
      // TEVM doesn't support account changes in the same way
    },
    
    onChainChanged(_chainId: string) {
      // TEVM doesn't support chain changes
    },
    
    onDisconnect() {
      // No cleanup needed
    },
  }))
}