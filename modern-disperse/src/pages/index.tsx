import React, { useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import CurrencySelector from '../components/CurrencySelector';
import TokenLoader from '../components/TokenLoader';
import AddressInput from '../components/AddressInput';
import TransactionButton from '../components/TransactionButton';
import { TokenInfo } from '../hooks/useToken';
import { ParsedRecipient } from '../utils/parseInput';
import { DISPERSE_CONTRACT_ADDRESS } from '../contracts/contractAddresses';

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | 'TOKEN'>('ETH');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [recipients, setRecipients] = useState<ParsedRecipient[]>([]);
  const [totalAmount, setTotalAmount] = useState<bigint>(BigInt(0));

  // Check if Disperse contract is deployed on current network
  const isNetworkSupported = chain && chain.id in DISPERSE_CONTRACT_ADDRESS;

  // Handle currency selection
  const handleCurrencySelect = (currency: 'ETH' | 'TOKEN') => {
    setSelectedCurrency(currency);
    // Reset recipients when switching currency
    setRecipients([]);
    setTotalAmount(BigInt(0));
  };

  // Handle token loaded from TokenLoader
  const handleTokenLoaded = (info: TokenInfo) => {
    setTokenInfo(info);
  };

  // Handle recipients change from AddressInput
  const handleRecipientsChange = (newRecipients: ParsedRecipient[], newTotal: bigint) => {
    setRecipients(newRecipients);
    setTotalAmount(newTotal);
  };

  return (
    <>
      <Head>
        <title>Disperse App</title>
        <meta name="description" content="Distribute ETH or tokens to multiple addresses in one transaction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
          {!isConnected ? (
            <div className="text-center my-20">
              <h2 className="text-2xl font-bold mb-6">Welcome to Disperse</h2>
              <p className="mb-8">Connect your wallet to distribute ETH or tokens to multiple addresses.</p>
              <p className="text-gray-500 dark:text-gray-400">Please connect your wallet to continue.</p>
            </div>
          ) : !isNetworkSupported ? (
            <div className="text-center my-20">
              <h2 className="text-2xl font-bold mb-6">Unsupported Network</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Please switch to a supported network to use Disperse.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Disperse App</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Distribute ETH or tokens to multiple addresses in one transaction.
                </p>
              </div>
              
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onSelectCurrency={handleCurrencySelect}
                isConnected={isConnected}
              />
              
              <TokenLoader 
                isVisible={selectedCurrency === 'TOKEN'}
                onTokenLoaded={handleTokenLoaded}
              />
              
              <AddressInput
                isVisible={selectedCurrency === 'ETH' || (selectedCurrency === 'TOKEN' && !!tokenInfo)}
                selectedCurrency={selectedCurrency}
                tokenInfo={tokenInfo}
                onRecipientsChanged={handleRecipientsChange}
              />
              
              <TransactionButton
                isVisible={recipients.length > 0}
                selectedCurrency={selectedCurrency}
                recipients={recipients}
                totalAmount={totalAmount}
                tokenInfo={tokenInfo}
              />
            </>
          )}
        </main>
        
        <footer className="py-6 text-center border-t text-sm text-gray-500 dark:text-gray-400">
          <div className="container mx-auto">
            <p>
              Disperse App · <a href="https://github.com/banteg/disperse" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;