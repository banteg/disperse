import { createSignal, createMemo, createEffect } from 'solid-js'
import { getBytecode } from '@wagmi/core'
import { config } from '../wagmi.config'
import { disperse_createx, isDisperseContract } from '../utils'
import type { VerifiedAddress } from '../types'


export function useContractVerification(
  chainId: () => number | undefined,
  isConnected: () => boolean
) {
  const [verifiedAddress, setVerifiedAddress] = createSignal<VerifiedAddress | null>(null)
  const [isLoading, setIsLoading] = createSignal(false)
  const [isContractDeployed, setIsContractDeployed] = createSignal(false)


  // Check contracts when chain changes
  createEffect(async () => {
    const currentChainId = chainId()
    const connected = isConnected()
    
    if (!currentChainId || !connected) {
      setVerifiedAddress(null)
      setIsContractDeployed(false)
      return
    }

    setIsLoading(true)
    setVerifiedAddress(null)
    // Check createx contract
    try {
      const bytecode = await getBytecode(config, {
        address: disperse_createx.address as `0x${string}`,
        chainId: currentChainId,
      })

      if (bytecode && isDisperseContract(bytecode)) {
        setVerifiedAddress({ address: disperse_createx.address as `0x${string}`, label: 'createx' })
        setIsContractDeployed(true)
      } else {
        setVerifiedAddress(null)
        setIsContractDeployed(false)
      }
    } catch (error) {
      console.error('Error checking createx contract:', error)
      setVerifiedAddress(null)
      setIsContractDeployed(false)
    }
    setIsLoading(false)
  })

  return {
    verifiedAddress,
    isLoading,
    hasContractAddress: createMemo(() => verifiedAddress() !== null),
    isContractDeployed: createMemo(() => isContractDeployed()),
  }
}