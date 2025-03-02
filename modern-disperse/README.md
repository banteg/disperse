# Modern Disperse App

A modernized version of the Disperse application, rebuilt with React, TypeScript, and Wagmi.

## Overview

This application allows users to distribute ETH or ERC-20 tokens to multiple addresses in a single transaction, saving gas costs compared to multiple individual transactions.

## Features

- Connect with any Ethereum wallet via ConnectKit
- Choose between sending ETH or ERC-20 tokens
- Paste lists of addresses and amounts in various formats
- Automatic validation of inputs
- Support for token allowances and approvals
- Multi-chain support via Wagmi
- Modern React components with TypeScript
- Responsive design with custom CSS

## Supported Networks

- Ethereum Mainnet
- Optimism
- Polygon
- Arbitrum
- Base
- Filecoin
- Plus many others where the Disperse contract is deployed

## Contract

The app uses the existing Disperse contract which is deployed on multiple chains:

```solidity
contract Disperse {
    function disperseEther(address[] recipients, uint256[] values) external payable;
    function disperseToken(IERC20 token, address[] recipients, uint256[] values) external;
    function disperseTokenSimple(IERC20 token, address[] recipients, uint256[] values) external;
}
```

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
# Optional: RPC endpoints for each chain
NEXT_PUBLIC_ETHEREUM_RPC=https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY
NEXT_PUBLIC_OPTIMISM_RPC=https://opt-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_ARBITRUM_RPC=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_BASE_RPC=https://mainnet.base.org

# Required for WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

## Credits

This is a modern rewrite of the original [Disperse](https://github.com/banteg/disperse) application, using current web3 development standards and libraries.