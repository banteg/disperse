import { createConnector } from '@wagmi/core'
import { custom, type Chain } from 'viem'
import { anvil, localhost } from 'viem/chains'

export interface LocalConnectorOptions {
  chain?: Chain
  name?: string
  rpcUrl?: string
}

const DEFAULT_ACCOUNTS = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
  '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
] as const

export function local(options: LocalConnectorOptions = {}) {
  const { 
    chain = anvil, 
    name = chain.name || 'Local',
    rpcUrl = chain.rpcUrls.default.http[0]
  } = options

  let connected = false
  let accounts: readonly `0x${string}`[] = []

  return createConnector((config) => ({
    id: `local-${chain.id}`,
    name,
    type: 'local' as const,
    
    async connect() {
      if (!connected) {
        // For local development, we'll use the default accounts
        accounts = DEFAULT_ACCOUNTS
        connected = true
      }
      
      return {
        accounts: [...accounts],
        chainId: chain.id,
      }
    },
    
    async disconnect() {
      connected = false
      accounts = []
    },
    
    async getAccounts() {
      if (!connected) {
        throw new Error('Not connected')
      }
      return [...accounts]
    },
    
    async getChainId() {
      return chain.id
    },
    
    async getProvider() {
      if (typeof window !== 'undefined' && window.ethereum) {
        // If MetaMask or another wallet is available and connected to local network
        return window.ethereum
      }
      
      // Otherwise, provide a custom transport
      return {
        request: async ({ method, params }: any) => {
          const transport = custom({
            async request({ method, params }) {
              const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: 1,
                  method,
                  params,
                }),
              })
              
              const data = await response.json()
              if (data.error) {
                throw new Error(data.error.message)
              }
              
              return data.result
            },
          })
          
          const client = config.getClient({ chainId: chain.id })
          return transport({ chain: chain as any, retryCount: 0 }).request({ method, params })
        },
      }
    },
    
    async isAuthorized() {
      return connected
    },
    
    async switchChain({ chainId }) {
      if (chainId !== chain.id) {
        throw new Error(`Local connector only supports ${chain.name} (chainId: ${chain.id})`)
      }
      return chain
    },
    
    onAccountsChanged(accounts) {
      // Local connector doesn't support account changes
    },
    
    onChainChanged(chainId) {
      // Local connector doesn't support chain changes
    },
    
    onDisconnect() {
      connected = false
      accounts = []
    },
  }))
}