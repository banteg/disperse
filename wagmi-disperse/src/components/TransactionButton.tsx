import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20, disperse } from '../contracts'
import { TokenInfo, Recipient } from '../types'
import { explorerTx } from '../networks'

interface TransactionButtonProps {
  show?: boolean
  disabled?: boolean
  title: string
  action: 'disperseEther' | 'disperseToken' | 'approve' | 'deny'
  message?: string
  chainId?: number
  recipients: Recipient[]
  token: TokenInfo
}

const TransactionButton = ({ 
  show = true, 
  disabled = false, 
  title, 
  action, 
  message, 
  chainId,
  recipients,
  token
}: TransactionButtonProps) => {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const disperseAddress = chainId 
    ? (disperse.address[chainId as keyof typeof disperse.address] as `0x${string}` | undefined) 
    : undefined

  const { 
    writeContract, 
    isPending: isWritePending, 
    isSuccess: isWriteSuccess, 
    isError: isWriteError, 
    error: writeError 
  } = useWriteContract()
  
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  })

  // Update error message when write fails
  useEffect(() => {
    if (isWriteError && writeError) {
      setErrorMessage(writeError.message || 'Transaction failed')
    }
  }, [isWriteError, writeError])

  const handleClick = async () => {
    if (!disperseAddress) {
      setErrorMessage('Disperse contract address not found for this network')
      return
    }

    setErrorMessage('')
    
    try {
      if (action === 'disperseEther') {
        writeContract({
          address: disperseAddress,
          abi: disperse.abi,
          functionName: 'disperseEther',
          args: [
            recipients.map(r => r.address),
            recipients.map(r => r.value)
          ],
          value: recipients.reduce((sum, r) => sum + r.value, 0n)
        }, {
          onSuccess(hash) {
            setTxHash(hash)
          },
          onError(error) {
            setErrorMessage(error.message || 'Transaction failed')
          }
        })
      } 
      else if (action === 'disperseToken' && token.address) {
        writeContract({
          address: disperseAddress,
          abi: disperse.abi,
          functionName: 'disperseToken',
          args: [
            token.address,
            recipients.map(r => r.address),
            recipients.map(r => r.value)
          ]
        }, {
          onSuccess(hash) {
            setTxHash(hash)
          },
          onError(error) {
            setErrorMessage(error.message || 'Transaction failed')
          }
        })
      }
      else if (action === 'approve' && token.address) {
        writeContract({
          address: token.address,
          abi: erc20.abi,
          functionName: 'approve',
          args: [
            disperseAddress,
            BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') // MaxUint256
          ]
        }, {
          onSuccess(hash) {
            setTxHash(hash)
          },
          onError(error) {
            setErrorMessage(error.message || 'Transaction failed')
          }
        })
      }
      else if (action === 'deny' && token.address) {
        writeContract({
          address: token.address,
          abi: erc20.abi,
          functionName: 'approve',
          args: [disperseAddress, 0n]
        }, {
          onSuccess(hash) {
            setTxHash(hash)
          },
          onError(error) {
            setErrorMessage(error.message || 'Transaction failed')
          }
        })
      }
    } catch (error: any) {
      console.error('Transaction error:', error)
      setErrorMessage(error?.message || 'Transaction failed')
    }
  }

  if (!show) {
    return null
  }

  return (
    <div className="row">
      <input
        type="submit"
        value={title}
        onClick={handleClick}
        disabled={disabled || isWritePending || isConfirming}
      />
      {message && <span className="error"> {message}</span>}
      {isWritePending && <span className="pending"> waiting for wallet confirmation...</span>}
      {isConfirming && <span className="pending"> waiting for transaction...</span>}
      {isConfirmed && (
        <span>
          <a href={explorerTx(txHash || undefined, chainId)} target="_blank" rel="noopener noreferrer">
            transaction confirmed
          </a>
        </span>
      )}
      {errorMessage && <span className="error"> {errorMessage}</span>}
    </div>
  )
}

export default TransactionButton