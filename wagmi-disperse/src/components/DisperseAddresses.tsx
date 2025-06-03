import { memo } from "react";
import { formatUnits } from "viem";
import type { Recipient } from "../types";

interface DisperseAddressesProps {
  recipients: Recipient[];
  symbol: string;
  decimals: number;
  balance: bigint;
  left: bigint;
  total: bigint;
}

const DisperseAmount = memo(({ amount, symbol, decimals }: { amount: bigint; symbol: string; decimals: number }) => {
  return (
    <div>
      {formatUnits(amount, decimals)} <span className="sc">{symbol}</span>
    </div>
  );
});

const DisperseAddresses = ({ recipients, symbol, decimals, balance, left, total }: DisperseAddressesProps) => {
  return (
    <div>
      <ul>
        <li className="accent">
          <div className="flex">
            <div>address</div>
            <div className="expand" />
            <div>amount</div>
          </div>
        </li>
        {recipients.map((addr) => (
          <li key={addr.address}>
            <div className="flex">
              <div>{addr.address}</div>
              <div className="expand bar" />
              <DisperseAmount amount={addr.value} symbol={symbol} decimals={decimals} />
            </div>
          </li>
        ))}
      </ul>

      <ul>
        <li className="accent">
          <div className="flex">
            <div>total</div>
            <div className="expand" />
            <DisperseAmount amount={total} symbol={symbol} decimals={decimals} />
          </div>
        </li>
        <li className="accent">
          <div className="flex">
            <div>your balance</div>
            <div className="expand" />
            <DisperseAmount amount={balance} symbol={symbol} decimals={decimals} />
          </div>
        </li>
        <li className="accent">
          <div className={`flex fade ${left < 0n ? "negative" : ""}`}>
            <div>remaining</div>
            <div className="expand" />
            <DisperseAmount amount={left} symbol={symbol} decimals={decimals} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default memo(DisperseAddresses);
