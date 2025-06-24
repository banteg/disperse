import { createSignal, createEffect, Show } from 'solid-js'
import { isAddress, type BaseError } from 'viem'
import { multicall } from '@wagmi/core'
import { config } from '../wagmi.config'
import { erc20 } from '../contracts'
import type { TokenInfo } from '../types'

interface TokenLoaderProps {
  onSelect: (token: TokenInfo) => void
  onError: () => void
  chainId?: number
  account?: `0x${string}`
  token?: TokenInfo
  contractAddress?: `0x${string}`
}

const TokenLoader = (props: TokenLoaderProps) => {
  const [tokenAddress, setTokenAddress] = createSignal<`0x${string}` | ''>(props.token?.address || '')
  const [isLoading, setIsLoading] = createSignal(false)
  const [errorMessage, setErrorMessage] = createSignal('')

  const disperseContractAddress = () => props.contractAddress

  // Update tokenAddress if token prop changes
  createEffect(() => {
    if (props.token?.address && props.token.address !== tokenAddress()) {
      setTokenAddress(props.token.address)
    }
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    
    const address = tokenAddress()
    if (!isAddress(address)) {
      setErrorMessage('invalid token address')
      return
    }

    if (!props.account || !props.chainId) {
      setErrorMessage('wallet not connected')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      // Use multicall to batch all token data calls
      const contracts = [
        {
          address: address as `0x${string}`,
          abi: erc20.abi,
          functionName: 'name',
        },
        {
          address: address as `0x${string}`,
          abi: erc20.abi,
          functionName: 'symbol',
        },
        {
          address: address as `0x${string}`,
          abi: erc20.abi,
          functionName: 'decimals',
        },
        {
          address: address as `0x${string}`,
          abi: erc20.abi,
          functionName: 'balanceOf',
          args: [props.account],
        },
        {
          address: address as `0x${string}`,
          abi: erc20.abi,
          functionName: 'allowance',
          args: [props.account, disperseContractAddress()],
        },
      ]

      const results = await multicall(config, {
        contracts,
        chainId: props.chainId,
      })

      // Check if all calls were successful
      const hasError = results.some(result => result.status === 'failure')
      if (hasError) {
        const firstError = results.find(result => result.status === 'failure')?.error
        const errorMsg = firstError
          ? (firstError as BaseError).shortMessage || firstError.message || 'error loading token data'
          : 'error loading token data'
        setErrorMessage(errorMsg)
        setIsLoading(false)
        props.onError()
        return
      }

      // Extract results
      const [nameResult, symbolResult, decimalsResult, balanceResult, allowanceResult] = results

      const tokenInfo: TokenInfo = {
        address: address as `0x${string}`,
        name: nameResult.result as string,
        symbol: symbolResult.result as string,
        decimals: Number(decimalsResult.result),
        balance: BigInt(balanceResult.result as string | number),
        allowance: BigInt(allowanceResult.result as string | number),
      }

      setErrorMessage('')
      props.onSelect(tokenInfo)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading token:', error)
      const errorMsg = error instanceof Error ? error.message : 'error loading token data'
      setErrorMessage(errorMsg)
      setIsLoading(false)
      props.onError()
    }
  }

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setTokenAddress(target.value as `0x${string}` | '')
    setErrorMessage('')
  }

  return (
    <>
      <h2>token address</h2>
      <form onSubmit={handleSubmit}>
        <div class="flex">
          <input
            type="text"
            placeholder="0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"
            value={tokenAddress()}
            onInput={handleChange}
            disabled={isLoading()}
            style={{
              'flex-grow': '1',
              border: 'none',
              'border-bottom': '2px #111 solid',
              padding: '.7rem',
              background: 'aquamarine',
              'margin-right': '1.4rem',
            }}
          />
          <input type="submit" value="load" disabled={isLoading()} />
        </div>
        <Show when={errorMessage()}>
          <p class="error">{errorMessage()}</p>
        </Show>
        <Show when={isLoading()}>
          <p class="pending">loading token data...</p>
        </Show>
      </form>
    </>
  )
}

export default TokenLoader