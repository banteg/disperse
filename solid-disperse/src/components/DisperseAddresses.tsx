import { For } from 'solid-js'
import { formatUnits } from 'viem'
import type { Recipient } from '../types'

interface DisperseAddressesProps {
  recipients: Recipient[]
  symbol: string
  decimals: number
  balance: bigint
  left: bigint
  total: bigint
}

const DisperseAmount = (props: { amount: bigint; symbol: string; decimals: number }) => {
  return (
    <div>
      {formatUnits(props.amount, props.decimals)} <span class="sc">{props.symbol}</span>
    </div>
  )
}

const DisperseAddresses = (props: DisperseAddressesProps) => {
  return (
    <div>
      <ul>
        <li class="accent">
          <div class="flex">
            <div>address</div>
            <div class="expand" />
            <div>amount</div>
          </div>
        </li>
        <For each={props.recipients}>
          {(addr) => (
            <li>
              <div class="flex">
                <div>{addr.address}</div>
                <div class="expand bar" />
                <DisperseAmount amount={addr.value} symbol={props.symbol} decimals={props.decimals} />
              </div>
            </li>
          )}
        </For>
      </ul>

      <ul>
        <li class="accent">
          <div class="flex">
            <div>total</div>
            <div class="expand" />
            <DisperseAmount amount={props.total} symbol={props.symbol} decimals={props.decimals} />
          </div>
        </li>
        <li class="accent">
          <div class="flex">
            <div>your balance</div>
            <div class="expand" />
            <DisperseAmount amount={props.balance} symbol={props.symbol} decimals={props.decimals} />
          </div>
        </li>
        <li class="accent">
          <div class={`flex fade ${props.left < 0n ? 'negative' : ''}`}>
            <div>remaining</div>
            <div class="expand" />
            <DisperseAmount amount={props.left} symbol={props.symbol} decimals={props.decimals} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default DisperseAddresses