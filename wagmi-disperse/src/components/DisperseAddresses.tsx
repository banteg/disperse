import { formatUnits } from 'viem'
import { Recipient } from '../types'

interface DisperseAddressesProps {
  recipients: Recipient[]
  symbol: string
  decimals: number
  balance: bigint
  left: bigint
  total: bigint
}

const DisperseAmount = ({ amount, symbol, decimals }: { amount: bigint, symbol: string, decimals: number }) => {
  return (
    <div>{formatUnits(amount, decimals)} {symbol}</div>
  )
}

const DisperseAddresses = ({ recipients, symbol, decimals, balance, left, total }: DisperseAddressesProps) => {
  return (
    <div>
      <ul>
        <li className="accent">
          <div className="flex">
            <div>address</div>
            <div className="expand"></div>
            <div>amount</div>
          </div>
        </li>
        {recipients.map((addr, index) => (
          <li key={index}>
            <div className="flex">
              <div>{addr.address}</div>
              <div className="expand bar"></div>
              <DisperseAmount amount={addr.value} symbol={symbol} decimals={decimals} />
            </div>
          </li>
        ))}
      </ul>

      <ul>
        <li className="accent">
          <div className="flex">
            <div>total</div>
            <div className="expand"></div>
            <DisperseAmount amount={total} symbol={symbol} decimals={decimals} />
          </div>
        </li>
        <li className="accent">
          <div className="flex">
            <div>your balance</div>
            <div className="expand"></div>
            <DisperseAmount amount={balance} symbol={symbol} decimals={decimals} />
          </div>
        </li>
        <li className="accent">
          <div className={`flex fade ${left < 0n ? 'negative' : ''}`}>
            <div>remaining</div>
            <div className="expand"></div>
            <DisperseAmount amount={left} symbol={symbol} decimals={decimals} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default DisperseAddresses