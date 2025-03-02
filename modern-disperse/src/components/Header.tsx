import React from 'react';
import { useAccount, useChains } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chains = useChains();
  const chain = chains?.[0];

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-4xl mr-2 accent">⟡</div>
        <span className="text-2xl">disperse</span>
      </div>
      
      <div className="flex items-center">
        {isConnected && chain && (
          <div className="pr accent">
            {chain.name}
          </div>
        )}
        
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;