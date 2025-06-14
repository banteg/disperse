import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AppState } from "../constants";
import type { DisperseStore } from "./types";

const useDisperseStore = create<DisperseStore>()(
  devtools(
    (set) => ({
      // Wallet slice
      address: undefined,
      chainId: undefined,
      isConnected: false,
      status: "disconnected",
      isChainSupported: false,

      updateWallet: (wallet) => set({
        address: wallet.address,
        chainId: wallet.chainId,
        isConnected: wallet.isConnected,
        status: wallet.status,
        isChainSupported: wallet.isChainSupported,
      }, false, 'updateWallet'),

      // Currency slice
      sending: null,
      token: {},

      setSending: (sending) => {
        set({ sending });
      },

      setToken: (token) => {
        set({ token, sending: "token" });
      },

      resetToken: () => {
        set({ token: {} }, false, 'resetToken');
      },

      // Transaction slice
      recipients: [],

      setRecipients: (recipients) => {
        set({ recipients });
      },

      clearRecipients: () => set({ recipients: [] }),

      // Contract slice
      verifiedAddress: null,
      hasContractAddress: false,
      isContractDeployed: false,
      isBytecodeLoading: false,
      potentialAddresses: [],
      createxDisperseAddress: undefined,
      customContractAddress: undefined,

      updateContract: (contract) => set({
        verifiedAddress: contract.verifiedAddress,
        hasContractAddress: contract.hasContractAddress,
        isContractDeployed: contract.isContractDeployed,
        isBytecodeLoading: contract.isBytecodeLoading,
        potentialAddresses: contract.potentialAddresses,
        createxDisperseAddress: contract.createxDisperseAddress,
      }, false, 'updateContract'),

      setCustomContractAddress: (address) => set({ customContractAddress: address }),

      // App state is now derived - no longer stored
    }),
    {
      name: "disperse-store",
    },
  ),
);

export default useDisperseStore;

// Selector hooks for better performance with shallow comparison
export const useWallet = () => {
  const address = useDisperseStore((state) => state.address);
  const chainId = useDisperseStore((state) => state.chainId);
  const isConnected = useDisperseStore((state) => state.isConnected);
  const status = useDisperseStore((state) => state.status);
  const isChainSupported = useDisperseStore((state) => state.isChainSupported);
  const updateWallet = useDisperseStore((state) => state.updateWallet);
  
  return {
    address,
    chainId,
    isConnected,
    status,
    isChainSupported,
    updateWallet,
  };
};

export const useCurrency = () => {
  const sending = useDisperseStore((state) => state.sending);
  const token = useDisperseStore((state) => state.token);
  const setSending = useDisperseStore((state) => state.setSending);
  const setToken = useDisperseStore((state) => state.setToken);
  const resetToken = useDisperseStore((state) => state.resetToken);
  
  return {
    sending,
    token,
    setSending,
    setToken,
    resetToken,
  };
};

export const useTransaction = () => {
  const recipients = useDisperseStore((state) => state.recipients);
  const setRecipients = useDisperseStore((state) => state.setRecipients);
  const clearRecipients = useDisperseStore((state) => state.clearRecipients);
  
  return {
    recipients,
    setRecipients,
    clearRecipients,
  };
};

export const useContract = () => {
  const verifiedAddress = useDisperseStore((state) => state.verifiedAddress);
  const hasContractAddress = useDisperseStore((state) => state.hasContractAddress);
  const isContractDeployed = useDisperseStore((state) => state.isContractDeployed);
  const isBytecodeLoading = useDisperseStore((state) => state.isBytecodeLoading);
  const potentialAddresses = useDisperseStore((state) => state.potentialAddresses);
  const createxDisperseAddress = useDisperseStore((state) => state.createxDisperseAddress);
  const customContractAddress = useDisperseStore((state) => state.customContractAddress);
  const updateContract = useDisperseStore((state) => state.updateContract);
  const setCustomContractAddress = useDisperseStore((state) => state.setCustomContractAddress);
  
  return {
    verifiedAddress,
    hasContractAddress,
    isContractDeployed,
    isBytecodeLoading,
    potentialAddresses,
    createxDisperseAddress,
    customContractAddress,
    updateContract,
    setCustomContractAddress,
  };
};

// Derived selector for app state - eliminates race conditions
export const useAppState = () => {
  const appState = useDisperseStore((state) => {
    // Extract all necessary state
    const { status, isConnected, isChainSupported, isContractDeployed, isBytecodeLoading, hasContractAddress } = state;
    const { sending, token } = state;
    const recipients = state.recipients;
    
    // Disconnected or connecting states
    if (status === "disconnected") {
      return AppState.UNLOCK_WALLET;
    }
    
    if (status === "reconnecting" || status === "connecting") {
      return AppState.UNLOCK_WALLET;
    }
    
    // Connected but network issues
    if (isConnected && (!isContractDeployed || !isChainSupported)) {
      // Still loading bytecode, maintain current state
      if (isBytecodeLoading && hasContractAddress) {
        return AppState.CONNECTED_TO_WALLET;
      }
      return AppState.NETWORK_UNAVAILABLE;
    }
    
    // Connected and contract ready
    if (isConnected && isContractDeployed) {
      // No currency selected yet
      if (sending === null) {
        return AppState.CONNECTED_TO_WALLET;
      }
      
      // Ether selected
      if (sending === "ether") {
        // Check if recipients entered
        if (recipients.length > 0) {
          return AppState.ENTERED_AMOUNTS;
        }
        return AppState.SELECTED_CURRENCY;
      }
      
      // Token selected
      if (sending === "token") {
        const tokenReady = token.address && token.decimals !== undefined && token.symbol;
        if (!tokenReady) {
          return AppState.CONNECTED_TO_WALLET;
        }
        
        // Token is ready, check recipients
        if (recipients.length > 0) {
          return AppState.ENTERED_AMOUNTS;
        }
        return AppState.SELECTED_CURRENCY;
      }
    }
    
    // Default fallback
    return AppState.UNLOCK_WALLET;
  });
  
  return { appState };
};
