import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useConfig } from "wagmi";

export function ChainSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const config = useConfig();
  const { isConnected } = useAccount();

  // Get all chains from wagmi config
  const chains = config.chains;

  // Get the current chain
  const currentChain = chains.find((chain) => chain.id === chainId);

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    // Remove duplicate chains based on chainId
    const uniqueChains = Array.from(chains).reduce(
      (acc, chain) => {
        if (!acc.find((c) => c.id === chain.id)) {
          acc.push(chain);
        }
        return acc;
      },
      [] as Array<typeof chains[number]>,
    );

    const searchableChains = uniqueChains.map((chain) => ({
      ...chain,
      searchId: chain.id.toString(),
    }));

    return new Fuse(searchableChains, {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "searchId", weight: 0.3 },
      ],
      threshold: 0.4,
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 1,
    });
  }, [chains]);

  // Get unique chains for display
  const uniqueChains = useMemo(() => {
    const seen = new Set<number>();
    return Array.from(chains).filter((chain) => {
      if (seen.has(chain.id)) return false;
      seen.add(chain.id);
      return true;
    });
  }, [chains]);

  // Filter chains based on search query
  const filteredChains = useMemo(() => {
    if (!searchQuery.trim()) {
      // Sort chains with mainnet first, then by chain ID
      return [...uniqueChains].sort((a, b) => {
        // Put Ethereum mainnet first
        if (a.id === 1) return -1;
        if (b.id === 1) return 1;
        // Then other popular mainnets
        const popularChains = [137, 10, 42161, 8453]; // Polygon, Optimism, Arbitrum, Base
        const aPopular = popularChains.includes(a.id);
        const bPopular = popularChains.includes(b.id);
        if (aPopular && !bPopular) return -1;
        if (!aPopular && bPopular) return 1;
        // Finally sort by chain ID
        return a.id - b.id;
      });
    }

    // Use fuse.js search results which are ordered by relevance
    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, fuse, uniqueChains]);

  // Get a chain name with reasonable length
  const formatChainName = (name: string) => {
    // Remove redundant words and limit length
    return name.replace(" Mainnet", "").replace(" Network", "").replace(" Chain", "");
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(!isOpen)} className="chain-selector-trigger">
        {currentChain ? formatChainName(currentChain.name) : "Unsupported Chain"}
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="chain-selector-dropdown">
          <div className="chain-selector-dropdown-inner">
            <input
              type="text"
              placeholder="Search by name, id, or chain id..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="chain-selector-search"
              autoFocus
            />
            <div className="chain-selector-options">
              {filteredChains.length > 0 ? (
                filteredChains.map((chain) => (
                  <button
                    key={chain.id}
                    type="button"
                    onClick={() => {
                      switchChain({ chainId: chain.id });
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`chain-selector-option ${chain.id === chainId ? "active" : ""}`}
                  >
                    <span className="chain-name">{formatChainName(chain.name)}</span>
                    <span className="chain-id">{chain.id}</span>
                  </button>
                ))
              ) : (
                <div className="chain-selector-no-results">No chains found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChainSelector;
