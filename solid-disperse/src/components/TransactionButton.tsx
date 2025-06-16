import { createSignal, createEffect, Show } from 'solid-js'
import { writeContract, waitForTransactionReceipt, type BaseError } from '@wagmi/core'
import { config } from '../wagmi.config'
import { erc20 } from '../contracts'
import { disperse_legacy } from '../deploy'
import { disperseAbi } from '../disperseAbi'
import { explorerTx } from '../networks'
import type { Recipient, TokenInfo } from '../types'
import { formatError } from '../utils'

interface TransactionButtonProps {
  show?: boolean
  disabled?: boolean
  title: string
  action: 'disperseEther' | 'disperseToken' | 'approve' | 'deny'
  message?: string
  chainId?: number
  recipients: Recipient[]
  token: TokenInfo
  contractAddress?: `0x${string}`
  class?: string
  account?: `0x${string}`
}

const TransactionButton = (props: TransactionButtonProps) => {
  const [txHash, setTxHash] = createSignal<`0x${string}` | null>(null)
  const [errorMessage, setErrorMessage] = createSignal('')
  const [isPending, setIsPending] = createSignal(false)
  const [isConfirming, setIsConfirming] = createSignal(false)
  const [isSuccess, setIsSuccess] = createSignal(false)

  const contractAddress = () => props.contractAddress || (disperse_legacy.address as `0x${string}`)

  const handleClick = async () => {
    setErrorMessage('')
    setIsSuccess(false)
    
    const address = contractAddress()
    if (!address) {
      setErrorMessage('Disperse contract address not available for this network')
      return
    }

    try {
      setIsPending(true)
      let hash: `0x${string}` | undefined

      if (props.action === 'disperseEther') {
        hash = await writeContract(config, {
          address,
          abi: disperseAbi,
          functionName: 'disperseEther',
          args: [
            props.recipients.map((r) => r.address),
            props.recipients.map((r) => r.value)
          ],
          value: props.recipients.reduce((sum, r) => sum + r.value, 0n),
        })
      } else if (props.action === 'disperseToken' && props.token.address) {
        hash = await writeContract(config, {
          address,
          abi: disperseAbi,
          functionName: 'disperseToken',
          args: [
            props.token.address,
            props.recipients.map((r) => r.address),
            props.recipients.map((r) => r.value)
          ],
        })
      } else if (props.action === 'approve' && props.token.address) {
        hash = await writeContract(config, {
          address: props.token.address,
          abi: erc20.abi,
          functionName: 'approve',
          args: [
            address,
            BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') // MaxUint256
          ],
        })
      } else if (props.action === 'deny' && props.token.address) {
        hash = await writeContract(config, {
          address: props.token.address,
          abi: erc20.abi,
          functionName: 'approve',
          args: [address, 0n],
        })
      }

      if (hash) {
        setTxHash(hash)
        setIsPending(false)
        setIsConfirming(true)

        // Wait for transaction receipt
        const receipt = await waitForTransactionReceipt(config, {
          hash,
        })

        setIsConfirming(false)
        setIsSuccess(true)

        // In a real app, you'd refresh balances/allowances here
        console.log('Transaction successful:', receipt)
      }
    } catch (error) {
      console.error('Transaction error:', error)
      setIsPending(false)
      setIsConfirming(false)
      const err = error as BaseError
      setErrorMessage(formatError(err))
    }
  }

  if (!props.show) {
    return null
  }

  return (
    <div class={`transaction-button ${props.class || ''}`}>
      <input
        type="submit"
        value={props.title}
        onClick={handleClick}
        disabled={props.disabled || isPending() || isConfirming()}
      />
      <div class="status">
        <Show when={props.message}>
          <div>{props.message}</div>
        </Show>
        <Show when={isPending()}>
          <div class="pending">sign transaction with wallet</div>
        </Show>
        <Show when={isConfirming()}>
          <div class="pending">transaction pending</div>
        </Show>
        <Show when={isSuccess()}>
          <div class="success">transaction success</div>
        </Show>
        <Show when={errorMessage()}>
          <div class="failed">{errorMessage()}</div>
        </Show>
        <Show when={txHash()}>
          <a
            class="hash"
            href={explorerTx(txHash()!, props.chainId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash()}
          </a>
        </Show>
      </div>
    </div>
  )
}

export default TransactionButton