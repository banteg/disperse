import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AppState } from "./constants";
import type { Recipient, TokenInfo } from "./types";

interface AppStore {
  // Core state
  appState: AppState;
  sending: "ether" | "token" | null;
  token: TokenInfo;
  recipients: Recipient[];
  customContractAddress: `0x${string}` | undefined;

  // Actions
  setAppState: (state: AppState) => void;
  setSending: (type: "ether" | "token" | null) => void;
  setToken: (token: TokenInfo) => void;
  setRecipients: (recipients: Recipient[]) => void;
  setCustomContractAddress: (address: `0x${string}` | undefined) => void;
  resetToken: () => void;

  // Computed actions
  selectCurrency: (type: "ether" | "token") => void;
  selectToken: (tokenInfo: TokenInfo) => void;
}

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

export const useStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      appState: AppState.UNLOCK_WALLET,
      sending: "ether", // Initialize with "ether" instead of null
      token: {},
      recipients: [],
      customContractAddress: undefined,

      // Basic setters
      setAppState: (appState) => {
        debug(`AppState changed to: ${AppState[appState]}`);
        set({ appState });
      },

      setSending: (sending) => set({ sending }),

      setToken: (token) => set({ token }),

      setRecipients: (recipients) => set({ recipients }),

      setCustomContractAddress: (customContractAddress) => set({ customContractAddress }),

      resetToken: () => {
        set({
          token: {},
          appState: AppState.CONNECTED_TO_WALLET,
        });
      },

      // Complex actions
      selectCurrency: (type) => {
        const { token } = get();
        set({ sending: type });

        if (type === "ether") {
          set({ appState: AppState.SELECTED_CURRENCY });
        } else if (type === "token") {
          if (token.address && token.decimals !== undefined && token.symbol) {
            set({ appState: AppState.SELECTED_CURRENCY });
          } else {
            get().resetToken();
          }
        }
      },

      selectToken: (tokenInfo) => {
        set({
          token: tokenInfo,
          sending: "token",
          appState: AppState.SELECTED_CURRENCY,
        });
      },
    }),
    {
      name: "disperse-app-store",
    },
  ),
);
