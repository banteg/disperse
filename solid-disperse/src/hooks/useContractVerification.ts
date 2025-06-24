import { createSignal, createMemo, createEffect } from 'solid-js'
import { getBytecode } from '@wagmi/core'
import { config } from '../wagmi.config'
import { disperse_legacy, disperse_createx, isDisperseContract } from '../utils'
import type { VerifiedAddress } from '../types'

interface ContractStatus {
  legacy: boolean
  createx: boolean
}

export function useContractVerification(
  chainId: () => number | undefined,
  isConnected: () => boolean
) {
  const [verifiedAddress, setVerifiedAddress] = createSignal<VerifiedAddress | null>(null)
  const [isLoading, setIsLoading] = createSignal(false)
  const [contractStatuses, setContractStatuses] = createSignal<ContractStatus>({
    legacy: false,
    createx: false
  })

  const potentialAddresses = createMemo(() => {
    return [
      { address: disperse_legacy.address as `0x${string}`, label: 'legacy' },
      { address: disperse_createx.address as `0x${string}`, label: 'createx' },
    ]
  })

  // Check contracts when chain changes
  createEffect(async () => {
    const currentChainId = chainId()
    const connected = isConnected()
    
    if (!currentChainId || !connected) {
      setVerifiedAddress(null)
      setContractStatuses({ legacy: false, createx: false })
      return
    }

    setIsLoading(true)
    setVerifiedAddress(null)
    const statuses: ContractStatus = { legacy: false, createx: false }
    let firstValidContract: VerifiedAddress | null = null

    // Check each potential address
    for (const addressInfo of potentialAddresses()) {
      try {
        const bytecode = await getBytecode(config, {
          address: addressInfo.address,
          chainId: currentChainId,
        })

        if (bytecode && isDisperseContract(bytecode)) {
          // Update status for this contract
          if (addressInfo.label === 'legacy') {
            statuses.legacy = true
          } else if (addressInfo.label === 'createx') {
            statuses.createx = true
          }

          // Set the first valid contract as the verified address
          if (!firstValidContract) {
            firstValidContract = addressInfo
          }
        }
      } catch (error) {
        console.error(`Error checking ${addressInfo.label} contract:`, error)
      }
    }

    // Update states
    setContractStatuses(statuses)
    setVerifiedAddress(firstValidContract)
    setIsLoading(false)
  })

  return {
    verifiedAddress,
    isLoading,
    hasContractAddress: createMemo(() => verifiedAddress() !== null),
    isContractDeployed: createMemo(() => verifiedAddress() !== null),
    contractStatuses,
  }
}