import { act } from "@testing-library/react";
import { AppState } from "../constants";
import { useStore } from "../store";
import type { TokenInfo } from "../types";

// Get the initial state
const initialStoreState = useStore.getState();

// Helper to reset store
export const resetStore = () => {
  act(() => {
    useStore.setState(initialStoreState);
  });
};

// Helper to set specific store values
export const setStoreState = (partialState: Partial<ReturnType<typeof useStore.getState>>) => {
  act(() => {
    useStore.setState(partialState);
  });
};

// Helper to create a mock store state
export const createMockStoreState = (overrides?: Partial<ReturnType<typeof useStore.getState>>) => {
  return {
    appState: AppState.CONNECTED_TO_WALLET,
    sending: "ether" as const,
    token: {} as TokenInfo,
    recipients: [],
    customContractAddress: undefined,
    ...overrides,
  };
};
