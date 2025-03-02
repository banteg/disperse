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
    <div className="mt-6 mb-4">
      <h2 className="text-xl font-semibold mb-4">Select Currency</h2>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md border transition-colors ${
            selectedCurrency === 'ETH'
              ? 'bg-primary border-accent text-gray-900'
              : 'bg-gray-100 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectCurrency('ETH')}
        >
          Native Token (ETH)
        </button>
        <button
          className={`px-4 py-2 rounded-md border transition-colors ${
            selectedCurrency === 'TOKEN'
              ? 'bg-primary border-accent text-gray-900'
              : 'bg-gray-100 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectCurrency('TOKEN')}
        >
          ERC-20 Token
        </button>
      </div>
    </div>
  );
};

export default CurrencySelector;