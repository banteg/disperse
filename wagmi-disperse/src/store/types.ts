import type { AppState } from "../constants";
import type { Recipient, TokenInfo, VerifiedAddress } from "../types";

// Wallet slice state
export interface WalletSlice {
  address?: `0x${string}`;
  chainId?: number;
  isConnected: boolean;
  status: string;
  isChainSupported: boolean;

  // Actions
  updateWallet: (wallet: Partial<WalletSlice>) => void;
}

// Currency slice state
export interface CurrencySlice {
  sending: "ether" | "token" | null;
  token: TokenInfo;

  // Actions
  setSending: (sending: "ether" | "token" | null) => void;
  setToken: (token: TokenInfo) => void;
  resetToken: () => void;
}

// Transaction slice state
export interface TransactionSlice {
  recipients: Recipient[];

  // Actions
  setRecipients: (recipients: Recipient[]) => void;
  clearRecipients: () => void;
}

// Contract slice state
export interface ContractSlice {
  verifiedAddress?: VerifiedAddress | null;
  hasContractAddress: boolean;
  isContractDeployed: boolean;
  isBytecodeLoading: boolean;
  potentialAddresses: VerifiedAddress[];
  createxDisperseAddress?: `0x${string}`;
  customContractAddress?: `0x${string}`;

  // Actions
  updateContract: (contract: Partial<ContractSlice>) => void;
  setCustomContractAddress: (address: `0x${string}`) => void;
}

// App state slice
export interface AppStateSlice {
  appState: AppState;

  // Actions
  setAppState: (state: AppState) => void;
}

// Combined store type
export interface DisperseStore extends WalletSlice, CurrencySlice, TransactionSlice, ContractSlice, AppStateSlice {}
