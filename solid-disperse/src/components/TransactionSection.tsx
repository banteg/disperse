import { Show } from 'solid-js'
import type { Recipient, TokenInfo } from '../types'
import DisperseAddresses from './DisperseAddresses'
import TransactionButton from './TransactionButton'

interface TransactionSectionProps {
  sending: 'ether' | 'token' | null
  recipients: Recipient[]
  token: TokenInfo
  symbol: string
  decimals: number
  balance: bigint
  leftAmount: bigint
  totalAmount: bigint
  disperseMessage?: string
  chainId: number | undefined
  verifiedAddress?: `0x${string}`
  account?: `0x${string}`
  nativeCurrencyName?: string
  effectiveAllowance?: bigint
  onTransactionSuccess?: () => void
}

export default function TransactionSection(props: TransactionSectionProps) {
  const nativeCurrencyName = () => props.nativeCurrencyName || 'ETH'
  const effectiveAllowance = () => props.effectiveAllowance || 0n

  return (
    <>
      <section>
        <h2>confirm</h2>
        <DisperseAddresses
          recipients={props.recipients}
          symbol={props.symbol}
          decimals={props.decimals}
          balance={props.balance}
          left={props.leftAmount}
          total={props.totalAmount}
        />
        <Show when={props.sending === 'ether'}>
          <TransactionButton
            show={true}
            disabled={props.leftAmount < 0n}
            title={`disperse ${nativeCurrencyName()}`}
            action="disperseEther"
            message={props.disperseMessage}
            chainId={props.chainId}
            recipients={props.recipients}
            token={props.token}
            contractAddress={props.verifiedAddress}
            account={props.account}
            onSuccess={props.onTransactionSuccess}
          />
        </Show>
      </section>

      <Show when={props.sending === 'token'}>
        <section>
          <h2>allowance</h2>
          <p>
            {effectiveAllowance() < props.totalAmount
              ? 'allow smart contract to transfer tokens on your behalf.'
              : 'disperse contract has allowance, you can send tokens now.'}
          </p>
          <TransactionButton
            title={effectiveAllowance() < props.totalAmount ? 'approve' : 'revoke'}
            action={effectiveAllowance() < props.totalAmount ? 'approve' : 'deny'}
            chainId={props.chainId}
            recipients={props.recipients}
            token={props.token}
            contractAddress={props.verifiedAddress}
            class={effectiveAllowance() >= props.totalAmount ? 'secondary' : ''}
            account={props.account}
            onSuccess={props.onTransactionSuccess}
          />
          <TransactionButton
            show={true}
            disabled={props.leftAmount < 0n || effectiveAllowance() < props.totalAmount}
            title="disperse token"
            action="disperseToken"
            message={props.disperseMessage}
            chainId={props.chainId}
            recipients={props.recipients}
            token={props.token}
            contractAddress={props.verifiedAddress}
            account={props.account}
            onSuccess={props.onTransactionSuccess}
          />
        </section>
      </Show>
    </>
  )
}