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

      updateWallet: (wallet) => set((state) => ({ ...state, ...wallet }), false, 'updateWallet'),

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
        set({ token: {} });
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

      updateContract: (contract) => set((state) => ({ ...state, ...contract }), false, 'updateContract'),

      setCustomContractAddress: (address) => set({ customContractAddress: address }),

      // App state slice
      appState: AppState.UNLOCK_WALLET,

      setAppState: (appState) => set({ appState }),
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

export const useAppState = () => {
  const appState = useDisperseStore((state) => state.appState);
  const setAppState = useDisperseStore((state) => state.setAppState);
  
  return {
    appState,
    setAppState,
  };
};
