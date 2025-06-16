import { createSignal, createMemo } from 'solid-js'
import { writeContract, waitForTransactionReceipt, type BaseError } from '@wagmi/core'
import { config } from '../wagmi.config'

export type TransactionState = 'idle' | 'signing' | 'confirming' | 'success' | 'error'

interface UseWriteContractReturn {
  write: (args: any) => Promise<void>
  state: () => TransactionState
  error: () => string | null
  txHash: () => `0x${string}` | null
  isLoading: () => boolean
  reset: () => void
}

export function useWriteContract(): UseWriteContractReturn {
  const [state, setState] = createSignal<TransactionState>('idle')
  const [error, setError] = createSignal<string | null>(null)
  const [txHash, setTxHash] = createSignal<`0x${string}` | null>(null)

  const isLoading = createMemo(() => {
    const currentState = state()
    return currentState === 'signing' || currentState === 'confirming'
  })

  const reset = () => {
    setState('idle')
    setError(null)
    setTxHash(null)
  }

  const write = async (args: any) => {
    reset()
    setState('signing')

    try {
      // Send transaction
      const hash = await writeContract(config, args)
      setTxHash(hash)
      setState('confirming')

      // Wait for confirmation
      await waitForTransactionReceipt(config, { hash })
      setState('success')
    } catch (err) {
      setState('error')
      const error = err as BaseError
      setError(error.shortMessage || error.message || 'Transaction failed')
      throw err
    }
  }

  return {
    write,
    state,
    error,
    txHash,
    isLoading,
    reset,
  }
}