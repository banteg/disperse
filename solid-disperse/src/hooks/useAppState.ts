import { createSignal, createEffect, createMemo } from 'solid-js'
import { AppState } from '../constants'
import type { TokenInfo } from '../types'

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || '')
}

interface UseAppStateProps {
  isConnected: () => boolean
  chainId: () => number | undefined
  isChainSupported: () => boolean
  isContractDeployed: () => boolean
  isContractLoading: () => boolean
  sending: () => 'ether' | 'token'
  token: () => TokenInfo
  recipients: () => Array<any>
}

export function useAppState(props: UseAppStateProps) {
  const [appState, setAppState] = createSignal<AppState>(AppState.WALLET_REQUIRED)

  // Derive the app state based on various conditions
  createEffect(() => {
    const connected = props.isConnected()
    const chainSupported = props.isChainSupported()
    const contractDeployed = props.isContractDeployed()
    const contractLoading = props.isContractLoading()
    const sendingMode = props.sending()
    const tokenInfo = props.token()
    const recipientsList = props.recipients()

    debug('State calculation:', {
      connected,
      chainSupported,
      contractDeployed,
      contractLoading,
      sendingMode,
      hasToken: !!tokenInfo.symbol,
      recipientsCount: recipientsList.length
    })

    if (!connected) {
      setAppState(AppState.WALLET_REQUIRED)
      return
    }

    if (!chainSupported) {
      setAppState(AppState.NETWORK_UNSUPPORTED)
      return
    }

    if (contractLoading) {
      setAppState(AppState.CONTRACT_LOADING)
      return
    }

    if (!contractDeployed) {
      setAppState(AppState.CONTRACT_NOT_DEPLOYED)
      return
    }

    // At this point, wallet is connected, chain is supported, and contract is deployed
    if (recipientsList.length > 0) {
      setAppState(AppState.READY_TO_DISPERSE)
    } else {
      setAppState(AppState.AWAITING_INPUT)
    }
  })

  // Helper to check if we should show the main UI
  const isReady = createMemo(() => {
    const state = appState()
    return state === AppState.AWAITING_INPUT || state === AppState.READY_TO_DISPERSE
  })

  return {
    appState,
    isReady,
  }
}