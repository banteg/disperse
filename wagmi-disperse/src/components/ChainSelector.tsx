import { useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useConfig } from "wagmi";

export function ChainSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const config = useConfig();
  const { isConnected } = useAccount();

  // Get all chains from wagmi config
  const chains = config.chains;

  // Get the current chain
  const currentChain = chains.find((chain) => chain.id === chainId);

  // Get a chain name with reasonable length
  const formatChainName = (name: string) => {
    // Remove redundant words and limit length
    return name.replace(" Mainnet", "").replace(" Network", "").replace(" Chain", "");
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="chain-selector">
      <button onClick={() => setIsOpen(!isOpen)} className="chain-selector-button">
        {currentChain ? <>{formatChainName(currentChain.name)}</> : "Unsupported Chain"}
      </button>

      {isOpen && (
        <div className="chain-selector-dropdown">
          <div className="chain-selector-dropdown-inner">
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => {
                  switchChain({ chainId: chain.id });
                  setIsOpen(false);
                }}
                className={`chain-selector-option ${chain.id === chainId ? "active" : ""}`}
              >
                {formatChainName(chain.name)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChainSelector;
