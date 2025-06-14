import { create } from 'zustand';
import { Recipient, TokenInfo, VerifiedAddress } from '../types';
import { AppState } from '../constants';

interface AppStoreState {
  recipients: Recipient[];
  token: TokenInfo;
  sending: "ether" | "token" | null;
  appState: AppState;
  customContractAddress: `0x${string}` | undefined;
  verifiedAddress: VerifiedAddress | null;
  isContractDeployed: boolean;
  textareaValue: string;
}

interface AppStoreActions {
  setRecipients: (recipients: Recipient[]) => void;
  setToken: (token: TokenInfo) => void;
  setSending: (sending: "ether" | "token" | null) => void;
  setAppState: (appState: AppState) => void;
  setCustomContractAddress: (address: `0x${string}` | undefined) => void;
  setVerifiedAddress: (address: VerifiedAddress | null) => void;
  setIsContractDeployed: (isDeployed: boolean) => void;
  setTextareaValue: (value: string) => void;
  resetToken: () => void;
  evaluateAndSetAppState: (params: {
    status: string; // wagmi AccountStatus: 'connected' | 'connecting' | 'disconnected' | 'reconnecting';
    isConnected: boolean;
    chainId: number | undefined;
    isChainSupported: boolean;
    isContractDeployed: boolean;
    isBytecodeLoading: boolean;
    hasContractAddress: boolean;
  }) => void;
}

const initialState: AppStoreState = {
  recipients: [],
  token: {},
  sending: null,
  appState: AppState.UNLOCK_WALLET,
  customContractAddress: undefined,
  verifiedAddress: null,
  isContractDeployed: false,
  textareaValue: "",
};

export const useAppStore = create<AppStoreState & AppStoreActions>((set) => ({
  ...initialState,
  setRecipients: (recipients) => set({ recipients }),
  setToken: (token) => set({ token }),
  setSending: (sending) => set({ sending }),
  setAppState: (appState) => set({ appState }),
  setCustomContractAddress: (address) => set({ customContractAddress: address }),
  setVerifiedAddress: (address) => set({ verifiedAddress: address }),
  setIsContractDeployed: (isDeployed) => set({ isContractDeployed: isDeployed }),
  setTextareaValue: (value) => set({ textareaValue: value }),
  resetToken: () =>
    set((state) => {
      const nextState: Partial<AppStoreState> = { token: {} };
      if (state.appState === AppState.SELECT_TOKEN) {
        nextState.appState = AppState.CONNECTED_TO_WALLET;
      }
      return nextState;
    }),
  evaluateAndSetAppState: ({
    status,
    isConnected,
    chainId,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
  }) => {
    set((state) => {
      const { sending, token, appState: currentAppStoreState } = state;

      if (status === "reconnecting" || status === "connecting") {
        return {}; // No change
      }

      let newCalculatedState = currentAppStoreState;

      if (status === "disconnected") {
        newCalculatedState = AppState.UNLOCK_WALLET;
      } else if (isConnected && (!isContractDeployed || !isChainSupported)) {
        if (isBytecodeLoading && hasContractAddress) {
          return {}; // No change, still loading
        }

        if (isContractDeployed) { // Contract exists, but chain might not be in wagmi's config
          // This implies !isChainSupported is true. Original hook allows proceeding.
          if (sending === "ether") {
            newCalculatedState = AppState.SELECTED_CURRENCY;
          } else if (sending === "token") {
            if (token.address && token.decimals !== undefined && token.symbol) {
              newCalculatedState = AppState.SELECTED_CURRENCY;
            } else {
              newCalculatedState = AppState.CONNECTED_TO_WALLET;
            }
          } else { // sending is null
            newCalculatedState = AppState.CONNECTED_TO_WALLET;
          }
        } else { // No contract deployed (on a potentially unsupported chain or a supported one)
          newCalculatedState = AppState.NETWORK_UNAVAILABLE;
        }
      } else if (isConnected) { // Connected, chain supported, contract deployed (if applicable for token)
        if (sending === "ether") {
          newCalculatedState = AppState.SELECTED_CURRENCY;
        } else if (sending === "token") {
          if (token.address && token.decimals !== undefined && token.symbol) {
            newCalculatedState = AppState.SELECTED_CURRENCY;
          } else {
            newCalculatedState = AppState.CONNECTED_TO_WALLET;
          }
        } else { // sending is null
           newCalculatedState = AppState.CONNECTED_TO_WALLET;
        }
      }

      if (newCalculatedState !== currentAppStoreState) {
        return { appState: newCalculatedState };
      }
      return {}; // No change
    });
  },
}));
