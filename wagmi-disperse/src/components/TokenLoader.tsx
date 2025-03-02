import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { isAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { erc20, disperse } from '../contracts'
import { TokenInfo } from '../types'

// Debug function to log TokenLoader events
const debug = (message: string, data?: any) => {
  console.log(`[TOKEN-LOADER] ${message}`, data || '')
}

interface TokenLoaderProps {
  onSelect: (token: TokenInfo) => void
  onError: () => void
  chainId?: number
  account?: `0x${string}`
}

const TokenLoader = ({ onSelect, onError, chainId, account }: TokenLoaderProps) => {
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | ''>('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const disperseAddress = chainId 
    ? (disperse.address[chainId as keyof typeof disperse.address] as `0x${string}` | undefined) 
    : undefined

  debug('Component rendered', { tokenAddress, isLoading, isSubmitted, chainId, account, disperseAddress })

  // Use wagmi's hooks to read token data
  const { data: nameData, isError: nameError } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20.abi,
    functionName: 'name',
    enabled: isSubmitted && !!tokenAddress,
  })

  const { data: symbolData, isError: symbolError } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20.abi,
    functionName: 'symbol',
    enabled: isSubmitted && !!tokenAddress,
  })

  const { data: decimalsData, isError: decimalsError } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20.abi,
    functionName: 'decimals',
    enabled: isSubmitted && !!tokenAddress,
  })

  const { data: balanceData, isError: balanceError } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20.abi,
    functionName: 'balanceOf',
    args: [account as `0x${string}`],
    enabled: isSubmitted && !!tokenAddress && !!account,
  })

  const { data: allowanceData, isError: allowanceError } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20.abi,
    functionName: 'allowance',
    args: [account as `0x${string}`, disperseAddress as `0x${string}`],
    enabled: isSubmitted && !!tokenAddress && !!account && !!disperseAddress,
  })

  // Log when contract data is received
  useEffect(() => {
    if (isSubmitted) {
      debug('Contract data status', { 
        name: nameData, 
        symbol: symbolData, 
        decimals: decimalsData, 
        balance: balanceData, 
        allowance: allowanceData,
        errors: {
          name: nameError,
          symbol: symbolError,
          decimals: decimalsError,
          balance: balanceError,
          allowance: allowanceError
        }
      })
    }
  }, [
    isSubmitted, 
    nameData, symbolData, decimalsData, balanceData, allowanceData,
    nameError, symbolError, decimalsError, balanceError, allowanceError
  ])

  // Use effect to process token data when it's loaded
  useEffect(() => {
    if (!isSubmitted) return;
    
    // Check for errors and handle them
    if (nameError || symbolError || decimalsError || balanceError || allowanceError) {
      debug('Error loading token data')
      setErrorMessage('Error loading token data')
      setIsLoading(false)
      setIsSubmitted(false)
      onError()
      return
    }

    // Process token data when all data is loaded
    if (nameData && symbolData && decimalsData !== undefined && balanceData !== undefined && allowanceData !== undefined) {
      debug('All token data loaded, creating token info')
      
      const tokenInfo: TokenInfo = {
        address: tokenAddress as `0x${string}`,
        name: nameData as string,
        symbol: symbolData as string,
        decimals: Number(decimalsData),
        balance: balanceData as bigint,
        allowance: allowanceData as bigint,
      }
      
      debug('Calling onSelect with token info', tokenInfo)
      onSelect(tokenInfo)
      setIsSubmitted(false)
      setIsLoading(false)
    }
  }, [
    isSubmitted, 
    nameData, symbolData, decimalsData, balanceData, allowanceData,
    nameError, symbolError, decimalsError, balanceError, allowanceError,
    onSelect, onError, tokenAddress
  ])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value as `0x${string}` | '')
    setErrorMessage('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    debug('Form submitted', { tokenAddress })
    
    if (!isAddress(tokenAddress)) {
      setErrorMessage('invalid token address')
      return
    }

    if (!account || !chainId) {
      setErrorMessage('wallet not connected')
      return
    }

    if (!disperseAddress) {
      setErrorMessage('disperse contract not deployed on this network')
      return
    }

    setIsLoading(true)
    setIsSubmitted(true)
    debug('Token loading started', { tokenAddress, account, disperseAddress })
  }

  return (
    <>
      <h2>which token?</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="token address"
            value={tokenAddress}
            onChange={handleChange}
            disabled={isLoading}
            className="pr"
            style={{ flexGrow: 1 }}
          />
          <input type="submit" value="load" disabled={isLoading} />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {isLoading && <p className="pending">loading token data...</p>}
      </form>
    </>
  )
}

export default TokenLoader