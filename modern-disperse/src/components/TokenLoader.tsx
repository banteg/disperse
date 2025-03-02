import React, { useState } from 'react';
import { useToken, TokenInfo } from '../hooks/useToken';
import { formatAmount } from '../utils/parseInput';

interface TokenLoaderProps {
  onTokenLoaded: (tokenInfo: TokenInfo) => void;
  isVisible: boolean;
}

const TokenLoader: React.FC<TokenLoaderProps> = ({ onTokenLoaded, isVisible }) => {
  const [inputAddress, setInputAddress] = useState('');
  const { 
    loadToken, 
    tokenInfo, 
    isLoading, 
    error 
  } = useToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadToken(inputAddress);
  };

  // When token is loaded, notify parent component
  React.useEffect(() => {
    if (tokenInfo) {
      onTokenLoaded(tokenInfo);
    }
  }, [tokenInfo, onTokenLoaded]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="my-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Load Token</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="tokenAddress" 
            className="block text-sm font-medium mb-1"
          >
            Token Address
          </label>
          <div className="flex">
            <input
              id="tokenAddress"
              type="text"
              className="text-input flex-grow"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="0x..."
              required
            />
            <button 
              type="submit" 
              className="btn-primary ml-2"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-100">
          {error}
        </div>
      )}

      {tokenInfo && (
        <div className="mt-4 p-3 bg-gray-50 rounded dark:bg-gray-800">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">
                {tokenInfo.name} ({tokenInfo.symbol})
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {tokenInfo.address}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                Balance
              </div>
              <div>
                {formatAmount(tokenInfo.balance, tokenInfo.decimals)} {tokenInfo.symbol}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenLoader;