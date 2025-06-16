import { createSignal, createResource, createEffect } from 'solid-js'
import { readContract } from '@wagmi/core'
import { config } from '../wagmi.config'
import { erc20 } from '../contracts'

interface UseTokenAllowanceProps {
  tokenAddress: () => `0x${string}` | undefined
  account: () => `0x${string}` | undefined
  spender: () => `0x${string}` | undefined
  chainId: () => number | undefined
}

export function useTokenAllowance(props: UseTokenAllowanceProps) {
  const [refreshTrigger, setRefreshTrigger] = createSignal(0)

  const [allowance] = createResource(
    () => ({
      tokenAddress: props.tokenAddress(),
      account: props.account(),
      spender: props.spender(),
      chainId: props.chainId(),
      trigger: refreshTrigger(),
    }),
    async ({ tokenAddress, account, spender, chainId }) => {
      if (!tokenAddress || !account || !spender || !chainId) {
        return null
      }

      try {
        const result = await readContract(config, {
          address: tokenAddress,
          abi: erc20.abi,
          functionName: 'allowance',
          args: [account, spender],
          chainId,
        })
        return result as bigint
      } catch (error) {
        console.error('Error fetching allowance:', error)
        return null
      }
    }
  )

  const refetch = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return {
    allowance,
    refetch,
  }
}