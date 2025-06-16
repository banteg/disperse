import { createSignal, onCleanup } from 'solid-js'
import {
  getAccount,
  getChainId,
  watchAccount,
  watchChainId,
  type GetAccountReturnType,
  type GetChainIdReturnType,
} from '@wagmi/core'
import { config } from './wagmi.config'

// 1. Create signals for global state. Initialize with current values.
export const [account, setAccount] = createSignal<GetAccountReturnType>(
  getAccount(config)
)
export const [chainId, setChainId] = createSignal<GetChainIdReturnType>(
  getChainId(config)
)
export const [isConnected, setIsConnected] = createSignal<boolean>(
  getAccount(config).isConnected
)

// 2. Create an init function to be called once.
export function initWeb3Watchers() {
  console.log('Initializing Web3 watchers...')

  const unwatchAccount = watchAccount(config, {
    onChange(newAccount) {
      setAccount(newAccount)
      setIsConnected(newAccount.isConnected)
    },
  })

  const unwatchChainId = watchChainId(config, {
    onChange(newChainId) {
      setChainId(newChainId)
    },
  })

  // 3. Ensure we cleanup watchers when the app is torn down (for HMR).
  onCleanup(() => {
    unwatchAccount()
    unwatchChainId()
  })
}