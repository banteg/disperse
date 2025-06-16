# Solid Disperse

A high-performance rewrite of the Disperse dapp using Solid.js and wagmi/core.

## Features

- 🚀 **Blazing Fast** - Built with Solid.js for optimal performance
- 🔗 **Web3 Integration** - Direct integration with wagmi/core v2
- 💸 **Multi-Send** - Send ETH or tokens to multiple addresses in one transaction
- 🔄 **Chain Support** - Works on Ethereum, Polygon, Arbitrum, Optimism, Base, and more
- 🎯 **Contract Verification** - Automatically detects and verifies disperse contracts
- 💰 **Token Support** - Full ERC20 token support with allowance management
- 📱 **Wallet Support** - MetaMask, WalletConnect, Safe, and injected wallets

## Tech Stack

- **Frontend**: Solid.js with TypeScript
- **Web3**: wagmi/core v2.17.3, viem v2.30.6
- **Build**: Vite
- **Styling**: Tufte CSS (same as original)
- **Search**: Fuse.js for chain selection

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Architecture

This rewrite follows the plan outlined in `WORK.md`:

1. **Reactive State Management** - Uses Solid's signals instead of React hooks
2. **Direct wagmi/core Usage** - No React-specific hooks, just core actions
3. **Simplified State Machine** - Removed complex state management in favor of reactive primitives
4. **Manual Contract Interactions** - Direct control over contract reads/writes

## Key Components

- `web3.store.ts` - Global reactive state for wallet/chain
- `useContractVerification` - Verifies disperse contract deployment
- `useTokenAllowance` - Reactive token allowance with refetch
- `TransactionButton` - Handles all transaction types
- `TokenLoader` - Manual multicall for token data

## Improvements Over React Version

- ⚡ Faster initial load and updates
- 📦 Smaller bundle size
- 🎯 More predictable reactivity
- 🛠️ Simpler mental model
- 🔄 Better control over data fetching

## License

MIT