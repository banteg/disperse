import { Show, createEffect } from 'solid-js'
import { erc20 } from '../contracts'
import { disperse_legacy } from '../utils'
import { disperseAbi } from '../disperseAbi'
import { explorerTx } from '../networks'
import type { Recipient, TokenInfo } from '../types'
import { useWriteContract } from '../hooks/useWriteContract'

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
  onSuccess?: () => void
}

const TransactionButton = (props: TransactionButtonProps) => {
  const { write, state, error, txHash, isLoading } = useWriteContract()

  const contractAddress = () => props.contractAddress || (disperse_legacy.address as `0x${string}`)

  // Call onSuccess when transaction succeeds
  createEffect(() => {
    if (state() === 'success' && props.onSuccess) {
      props.onSuccess()
    }
  })

  const handleClick = async () => {
    const address = contractAddress()
    if (!address) {
      return
    }

    try {
      if (props.action === 'disperseEther') {
        await write({
          address,
          abi: disperseAbi,
          functionName: 'disperseEther',
          args: [
            props.recipients.map((r) => r.address),
            props.recipients.map((r) => r.value)
          ],
          value: props.recipients.reduce((sum, r) => sum + r.value, 0n) as any,
        })
      } else if (props.action === 'disperseToken' && props.token.address) {
        await write({
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
        await write({
          address: props.token.address,
          abi: erc20.abi,
          functionName: 'approve',
          args: [
            address,
            BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') // MaxUint256
          ],
        })
      } else if (props.action === 'deny' && props.token.address) {
        await write({
          address: props.token.address,
          abi: erc20.abi,
          functionName: 'approve',
          args: [address, 0n],
        })
      }
    } catch {
      // Error is handled by the hook
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
        disabled={props.disabled || isLoading()}
      />
      <div class="status">
        <Show when={props.message}>
          <div>{props.message}</div>
        </Show>
        <Show when={state() === 'signing'}>
          <div class="pending">sign transaction with wallet</div>
        </Show>
        <Show when={state() === 'confirming'}>
          <div class="pending">transaction pending</div>
        </Show>
        <Show when={state() === 'success'}>
          <div class="success">transaction success</div>
        </Show>
        <Show when={state() === 'error' && error()}>
          <div class="failed">{error()}</div>
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