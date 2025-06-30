import { createSignal, createResource, createMemo, createEffect, on } from 'solid-js';
import { getBytecode, readContracts, getBalance } from '@wagmi/core';
import { config } from './wagmi.config';
import { erc20Abi } from './abi/erc20';
import { account, chainId, isConnected } from './web3.store';
import { disperse, isDisperseContract } from './contracts';
import { chains } from './networks';
import { AppState } from './constants';
import type { Recipient, TokenInfo } from './types';

export function createAppStore() {
  const [sending, setSending] = createSignal<'ether' | 'token'>('ether');
  const [tokenAddress, setTokenAddress] = createSignal<`0x${string}` | null>(null);
  const [recipients, setRecipients] = createSignal<Recipient[]>([]);

  const [contractBytecode, { refetch: refetchContract }] = createResource(
    () => {
      const currentChainId = chainId();
      if (!currentChainId || !isConnected()) return null;
      return {
        chainId: currentChainId,
        address: disperse.address,
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

  const [ethBalance, { refetch: refetchEthBalance }] = createResource(
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

  const [tokenMetadata, { refetch: refetchTokenMetadata }] = createResource(
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
            { ...tokenContract, functionName: 'allowance', args: [user, disperse.address] },
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

  createEffect(on(chainId, () => {
    setSending('ether');
    setTokenAddress(null);
    setRecipients([]);
  }));

  const isContractDeployed = createMemo(() => {
      return isDisperseContract(contractBytecode());
  });

  const appState = createMemo(() => {
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

  const isReady = createMemo(() => {
      const state = appState();
      return state === AppState.AWAITING_INPUT || state === AppState.READY_TO_DISPERSE;
  });

  return {
    sending, setSending,
    tokenAddress, setTokenAddress,
    recipients, setRecipients,
    contractBytecode, refetchContract,
    ethBalance, refetchEthBalance,
    tokenMetadata, refetchTokenMetadata,
    isContractDeployed,
    appState,
    isReady,
  };
}