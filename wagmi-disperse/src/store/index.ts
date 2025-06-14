import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AppState } from "../constants";
import type { DisperseStore } from "./types";

const useDisperseStore = create<DisperseStore>()(
  devtools(
    (set, get) => ({
      // Wallet slice
      address: undefined,
      chainId: undefined,
      isConnected: false,
      status: "disconnected",
      isChainSupported: false,

      updateWallet: (wallet) => set((state) => ({ ...state, ...wallet }), false, "updateWallet"),

      // Currency slice
      sending: null,
      token: {},

      setSending: (sending) => {
        set({ sending }, false, "setSending");

        // Update app state based on currency selection
        const { isConnected, token, setAppState } = get();
        if (isConnected) {
          if (sending === "ether") {
            setAppState(AppState.SELECTED_CURRENCY);
          } else if (sending === "token") {
            if (token.address && token.decimals !== undefined && token.symbol) {
              setAppState(AppState.SELECTED_CURRENCY);
            } else {
              setAppState(AppState.CONNECTED_TO_WALLET);
            }
          }
        }
      },

      setToken: (token) => {
        set({ token }, false, "setToken");

        // Auto-select token currency when token is set
        const { setSending, setAppState } = get();
        setSending("token");
        if (token.address && token.decimals !== undefined && token.symbol) {
          setAppState(AppState.SELECTED_CURRENCY);
        }
      },

      resetToken: () => {
        set({ token: {}, sending: null }, false, "resetToken");
        const { isConnected, setAppState } = get();
        if (isConnected) {
          setAppState(AppState.CONNECTED_TO_WALLET);
        }
      },

      // Transaction slice
      recipients: [],

      setRecipients: (recipients) => {
        set({ recipients }, false, "setRecipients");

        // Update app state if recipients are set with valid currency
        const { sending, token, setAppState } = get();
        if (
          recipients.length &&
          (sending === "ether" || (sending === "token" && token.address && token.decimals !== undefined))
        ) {
          setAppState(AppState.ENTERED_AMOUNTS);
        }
      },

      clearRecipients: () => set({ recipients: [] }, false, "clearRecipients"),

      // Contract slice
      verifiedAddress: null,
      hasContractAddress: false,
      isContractDeployed: false,
      isBytecodeLoading: false,
      potentialAddresses: [],
      createxDisperseAddress: undefined,
      customContractAddress: undefined,

      updateContract: (contract) => set((state) => ({ ...state, ...contract }), false, "updateContract"),

      setCustomContractAddress: (address) => set({ customContractAddress: address }, false, "setCustomContractAddress"),

      // App state slice
      appState: AppState.UNLOCK_WALLET,

      setAppState: (appState) => set({ appState }, false, "setAppState"),
    }),
    {
      name: "disperse-store",
    },
  ),
);

export default useDisperseStore;

// Selector hooks for better performance
export const useWallet = () =>
  useDisperseStore((state) => ({
    address: state.address,
    chainId: state.chainId,
    isConnected: state.isConnected,
    status: state.status,
    isChainSupported: state.isChainSupported,
    updateWallet: state.updateWallet,
  }));

export const useCurrency = () =>
  useDisperseStore((state) => ({
    sending: state.sending,
    token: state.token,
    setSending: state.setSending,
    setToken: state.setToken,
    resetToken: state.resetToken,
  }));

export const useTransaction = () =>
  useDisperseStore((state) => ({
    recipients: state.recipients,
    setRecipients: state.setRecipients,
    clearRecipients: state.clearRecipients,
  }));

export const useContract = () =>
  useDisperseStore((state) => ({
    verifiedAddress: state.verifiedAddress,
    hasContractAddress: state.hasContractAddress,
    isContractDeployed: state.isContractDeployed,
    isBytecodeLoading: state.isBytecodeLoading,
    potentialAddresses: state.potentialAddresses,
    createxDisperseAddress: state.createxDisperseAddress,
    customContractAddress: state.customContractAddress,
    updateContract: state.updateContract,
    setCustomContractAddress: state.setCustomContractAddress,
  }));

export const useAppState = () =>
  useDisperseStore((state) => ({
    appState: state.appState,
    setAppState: state.setAppState,
  }));
