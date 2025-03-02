import React from 'react';
import { useAccount, useChains } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chains = useChains();
  const chain = chains?.[0];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 border-b">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="text-4xl font-bold mr-2 text-accent">⟡</div>
        <h1 className="text-2xl font-bold">Disperse</h1>
      </div>
      
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        {isConnected && chain && (
          <div className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
            {chain.name}
          </div>
        )}
        
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;