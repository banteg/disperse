import { createSignal, createMemo, createEffect } from 'solid-js'
import { getBytecode } from '@wagmi/core'
import { config } from '../wagmi.config'
import { disperse_legacy, disperse_createx, isDisperseContract } from '../utils'
import type { VerifiedAddress } from '../types'

export function useContractVerification(
  chainId: () => number | undefined,
  isConnected: () => boolean,
  customContractAddress?: () => `0x${string}` | undefined
) {
  const [verifiedAddress, setVerifiedAddress] = createSignal<VerifiedAddress | null>(null)
  const [isLoading, setIsLoading] = createSignal(false)

  const potentialAddresses = createMemo(() => {
    const addresses = [
      { address: disperse_legacy.address as `0x${string}`, label: 'legacy' },
      { address: disperse_createx.address as `0x${string}`, label: 'createx' },
    ]
    
    const custom = customContractAddress?.()
    if (custom) {
      addresses.push({ address: custom, label: 'custom' })
    }
    
    return addresses
  })

  // Check contracts when chain changes
  createEffect(async () => {
    const currentChainId = chainId()
    const connected = isConnected()
    
    if (!currentChainId || !connected) {
      setVerifiedAddress(null)
      return
    }

    setIsLoading(true)
    setVerifiedAddress(null)

    // Check each potential address
    for (const addressInfo of potentialAddresses()) {
      try {
        const bytecode = await getBytecode(config, {
          address: addressInfo.address,
          chainId: currentChainId,
        })

        if (bytecode && isDisperseContract(bytecode)) {
          setVerifiedAddress(addressInfo)
          setIsLoading(false)
          return
        }
      } catch (error) {
        console.error(`Error checking ${addressInfo.label} contract:`, error)
      }
    }

    // No valid contract found
    setIsLoading(false)
    setVerifiedAddress(null)
  })

  return {
    verifiedAddress,
    isLoading,
    hasContractAddress: createMemo(() => verifiedAddress() !== null),
    isContractDeployed: createMemo(() => verifiedAddress() !== null),
  }
}