import { createSignal, createMemo, Show, For, onCleanup } from 'solid-js'
import Fuse from 'fuse.js'
import { switchChain } from '@wagmi/core'
import { config } from '../wagmi.config'
import { chainId as chainIdSignal, isConnected } from '../web3.store'
import { chains } from '../networks'

export function ChainSelector() {
  const [isOpen, setIsOpen] = createSignal(false)
  const [searchQuery, setSearchQuery] = createSignal('')
  let dropdownRef: HTMLDivElement | undefined
  let triggerRef: HTMLButtonElement | undefined

  // Get the current chain
  const currentChain = createMemo(() => {
    const id = chainIdSignal()
    return chains.find((chain) => chain.id === id)
  })

  // Setup Fuse.js for fuzzy search
  const fuse = createMemo(() => {
    // Remove duplicate chains based on chainId
    const uniqueChains = chains.reduce(
      (acc, chain) => {
        if (!acc.find((c) => c.id === chain.id)) {
          acc.push(chain)
        }
        return acc
      },
      [] as typeof chains
    )

    const searchableChains = uniqueChains.map((chain) => ({
      ...chain,
      searchId: chain.id.toString(),
    }))

    return new Fuse(searchableChains, {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'searchId', weight: 0.3 },
      ],
      threshold: 0.4,
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 1,
    })
  })

  // Get unique chains for display
  const uniqueChains = createMemo(() => {
    const seen = new Set<number>()
    return chains.filter((chain) => {
      if (seen.has(chain.id)) return false
      seen.add(chain.id)
      return true
    })
  })

  // Filter chains based on search query
  const filteredChains = createMemo(() => {
    const query = searchQuery().trim()
    if (!query) {
      // Sort chains with mainnet first, then by chain ID
      return [...uniqueChains()].sort((a, b) => {
        // Put Ethereum mainnet first
        if (a.id === 1) return -1
        if (b.id === 1) return 1
        // Then other popular mainnets
        const popularChains = [137, 10, 42161, 8453] // Polygon, Optimism, Arbitrum, Base
        const aPopular = popularChains.includes(a.id)
        const bPopular = popularChains.includes(b.id)
        if (aPopular && !bPopular) return -1
        if (!aPopular && bPopular) return 1
        // Finally sort by chain ID
        return a.id - b.id
      })
    }

    // Use fuse.js search results which are ordered by relevance
    const results = fuse().search(query)
    return results.map((result) => result.item)
  })

  // Get a chain name with reasonable length
  const formatChainName = (name: string) => {
    // Remove redundant words and limit length
    return name
  }

  // Handle click outside to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef &&
      !dropdownRef.contains(event.target as Node) &&
      triggerRef &&
      !triggerRef.contains(event.target as Node)
    ) {
      setIsOpen(false)
      setSearchQuery('')
    }
  }

  // Setup/cleanup click outside listener
  createMemo(() => {
    if (isOpen()) {
      document.addEventListener('mousedown', handleClickOutside)
      onCleanup(() => {
        document.removeEventListener('mousedown', handleClickOutside)
      })
    }
  })

  const handleChainSwitch = async (id: number) => {
    try {
      await switchChain(config, { chainId: id })
      setIsOpen(false)
      setSearchQuery('')
    } catch (error) {
      console.error('Failed to switch chain:', error)
    }
  }

  return (
    <Show when={isConnected()}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        class="chain-selector-trigger"
      >
        {currentChain() ? formatChainName(currentChain()!.name) : 'Unsupported Chain'}
      </button>

      <Show when={isOpen()}>
        <div ref={dropdownRef} class="chain-selector-dropdown">
          <div class="chain-selector-dropdown-inner">
            <input
              type="text"
              placeholder="Search by name, id, or chain id..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="chain-selector-search"
            />
            <div class="chain-selector-options">
              <Show
                when={filteredChains().length > 0}
                fallback={<div class="chain-selector-no-results">No chains found</div>}
              >
                <For each={filteredChains()}>
                  {(chain) => (
                    <button
                      type="button"
                      onClick={() => handleChainSwitch(chain.id)}
                      class={`chain-selector-option ${chain.id === chainIdSignal() ? 'active' : ''}`}
                    >
                      <span class="chain-name">{formatChainName(chain.name)}</span>
                      <span class="chain-id">{chain.id}</span>
                    </button>
                  )}
                </For>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </Show>
  )
}

export default ChainSelector