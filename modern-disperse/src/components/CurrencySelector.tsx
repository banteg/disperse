import React from 'react';

interface CurrencySelectorProps {
  selectedCurrency: 'ETH' | 'TOKEN';
  onSelectCurrency: (currency: 'ETH' | 'TOKEN') => void;
  isConnected: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onSelectCurrency,
  isConnected
}) => {
  if (!isConnected) {
    return null;
  }

  return (
    <div className="chooser">
      <span>select currency </span>
      <div className="flex">
        <input
          type="radio"
          id="eth"
          name="currency"
          checked={selectedCurrency === 'ETH'}
          onChange={() => onSelectCurrency('ETH')}
        />
        <label
          htmlFor="eth"
          onClick={() => onSelectCurrency('ETH')}
        >
          native token (ETH)
        </label>
        <div className="end-bar"></div>
        <input
          type="radio"
          id="token"
          name="currency"
          checked={selectedCurrency === 'TOKEN'}
          onChange={() => onSelectCurrency('TOKEN')}
        />
        <label
          htmlFor="token"
          onClick={() => onSelectCurrency('TOKEN')}
        >
          ERC-20 token
        </label>
        <div className="end-bar"></div>
      </div>
    </div>
  );
};

export default CurrencySelector;