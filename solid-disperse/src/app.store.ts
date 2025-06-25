import { createSignal, createResource, createMemo } from 'solid-js';
import { getBytecode, readContracts, getBalance } from '@wagmi/core';
import { config } from './wagmi.config';
import { erc20Abi } from './abi/erc20';
import { account, chainId, isConnected } from './web3.store';
import { disperse_createx } from './utils';
import { chains } from './networks';
import { AppState } from './constants';
import type { Recipient, TokenInfo } from './types';

// State Signals
export const [sending, setSending] = createSignal<'ether' | 'token'>('ether');
export const [tokenAddress, setTokenAddress] = createSignal<`0x${string}` | null>(null);
export const [recipients, setRecipients] = createSignal<Recipient[]>([]);

// Resources
const [contractBytecode, { refetch: refetchContract }] = createResource(
  () => {
    const currentChainId = chainId();
    if (!currentChainId || !isConnected()) return null;
    return {
      chainId: currentChainId,
      address: disperse_createx.address as `0x${string}`,
    };
  },
  async (source) => {
    if (!source) return null;
    try {
      return await getBytecode(config, { address: source.address, chainId: source.chainId });
    } catch (e) {
      console.error("Failed to fetch bytecode", e);
      return null;
    }
  }
);

export const [ethBalance, { refetch: refetchEthBalance }] = createResource(
    () => ({ address: account().address, chainId: chainId() }),
    async ({ address, chainId }) => {
      if (!address || !chainId) return null;
      try {
        return await getBalance(config, { address, chainId });
      } catch {
        return null;
      }
    }
);

export const [tokenMetadata, { refetch: refetchTokenMetadata }] = createResource(
  () => {
    const address = tokenAddress();
    const user = account().address;
    const currentChainId = chainId();
    if (!address || !user || !currentChainId) return null;
    return { address, user, currentChainId };
  },
  async (source) => {
    const { address, user, currentChainId } = source;
    const tokenContract = {
      address: address,
      abi: erc20Abi,
      chainId: currentChainId,
    };
    try {
      const results = await readContracts(config, {
        contracts: [
          { ...tokenContract, functionName: 'name' },
          { ...tokenContract, functionName: 'symbol' },
          { ...tokenContract, functionName: 'decimals' },
          { ...tokenContract, functionName: 'balanceOf', args: [user] },
          { ...tokenContract, functionName: 'allowance', args: [user, disperse_createx.address] },
        ],
      });
      const [name, symbol, decimals, balance, allowance] = results.map(r => r.result);
      return {
        address: address,
        name: name as string,
        symbol: symbol as string,
        decimals: decimals as number,
        balance: balance as bigint,
        allowance: allowance as bigint,
      };
    } catch (e) {
      console.error("Failed to fetch token metadata:", e);
      return null;
    }
  }
);

export const isContractDeployed = createMemo(() => {
    const bytecode = contractBytecode();
    return !!bytecode && bytecode !== '0x';
});

// Derived State
export const appState = createMemo(() => {
  if (!isConnected()) {
    return AppState.WALLET_REQUIRED;
  }
  if (chainId() && !chains.some(c => c.id === chainId())) {
    return AppState.NETWORK_UNSUPPORTED;
  }
  if (contractBytecode.loading) {
    return AppState.CONTRACT_LOADING;
  }
  if (!isContractDeployed()) {
    return AppState.CONTRACT_NOT_DEPLOYED;
  }
  if (recipients().length > 0) {
    return AppState.READY_TO_DISPERSE;
  }
  return AppState.AWAITING_INPUT;
});

export const isReady = createMemo(() => {
    const state = appState();
    return state === AppState.AWAITING_INPUT || state === AppState.READY_TO_DISPERSE;
});
