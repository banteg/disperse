import { useEffect, useRef } from "react";
import { useMachine } from "@xstate/react";
import { disperseMachine, getAppStateFromMachine } from "../machines/disperseMachine";
import useDisperseStore from "../store";
import { AppState } from "../constants";

export function useDisperseMachine() {
  const store = useDisperseStore();
  const prevStateRef = useRef<any>(null);
  
  const [state, send] = useMachine(disperseMachine, {
    input: {
      isConnected: store.isConnected,
      isChainSupported: store.isChainSupported,
      isContractDeployed: store.isContractDeployed,
      isBytecodeLoading: store.isBytecodeLoading,
      hasContractAddress: store.hasContractAddress,
      sending: store.sending,
      token: store.token,
      recipientsCount: store.recipients.length,
      totalAmount: store.recipients.reduce((sum, r) => sum + r.value, 0n),
      allowance: store.token.allowance || 0n,
    },
  });

  // Sync store changes to machine
  useEffect(() => {
    const { status, isChainSupported, isContractDeployed } = store;
    
    if (status === "connected" && !state.matches("connected")) {
      send({ type: "CONNECT" });
    } else if (status === "disconnected" && !state.matches("disconnected")) {
      send({ type: "DISCONNECT" });
    }
    
    if (state.matches("connected") && prevStateRef.current?.isChainSupported !== isChainSupported) {
      send({ 
        type: "CHAIN_CHANGED", 
        isSupported: isChainSupported, 
        isDeployed: isContractDeployed 
      });
    }
  }, [store.status, store.isChainSupported, store.isContractDeployed, state, send]);

  // Sync contract verification
  useEffect(() => {
    if (store.isBytecodeLoading && !state.context.isBytecodeLoading) {
      send({ type: "CONTRACT_LOADING_STARTED" });
    } else if (!store.isBytecodeLoading && state.context.isBytecodeLoading) {
      send({ type: "CONTRACT_LOADING_FINISHED", isDeployed: store.isContractDeployed });
    }
  }, [store.isBytecodeLoading, store.isContractDeployed, state.context.isBytecodeLoading, send]);

  // Sync currency selection
  useEffect(() => {
    if (store.sending !== state.context.sending) {
      if (store.sending === "ether") {
        send({ type: "SELECT_ETHER" });
      } else if (store.sending === "token") {
        send({ type: "SELECT_TOKEN" });
      }
    }
  }, [store.sending, state.context.sending, send]);

  // Sync token loading
  useEffect(() => {
    if (store.sending === "token" && store.token.symbol && store.token.decimals !== undefined) {
      if (!state.context.token.symbol || state.context.token.decimals === undefined) {
        send({ type: "TOKEN_LOADED", token: store.token });
      }
    }
  }, [store.sending, store.token, state.context.token, send]);

  // Sync recipients
  useEffect(() => {
    const totalAmount = store.recipients.reduce((sum, r) => sum + r.value, 0n);
    if (store.recipients.length !== state.context.recipientsCount || totalAmount !== state.context.totalAmount) {
      send({ 
        type: "RECIPIENTS_CHANGED", 
        count: store.recipients.length, 
        totalAmount 
      });
    }
  }, [store.recipients, state.context.recipientsCount, state.context.totalAmount, send]);

  // Sync allowance
  useEffect(() => {
    const allowance = store.token.allowance || 0n;
    if (allowance !== state.context.allowance) {
      send({ type: "ALLOWANCE_UPDATED", allowance });
    }
  }, [store.token.allowance, state.context.allowance, send]);

  // Update previous state ref
  useEffect(() => {
    prevStateRef.current = {
      isChainSupported: store.isChainSupported,
      isContractDeployed: store.isContractDeployed,
    };
  });

  // Get AppState enum value for backward compatibility
  const appState = getAppStateEnumFromMachineState(state);

  return {
    state,
    send,
    appState,
    isInState: (stateValue: string) => state.matches(stateValue),
  };
}

function getAppStateEnumFromMachineState(state: any): AppState {
  const stateMapping = getAppStateFromMachine(state);
  
  switch (stateMapping) {
    case "UNLOCK_WALLET":
      return AppState.UNLOCK_WALLET;
    case "NETWORK_UNAVAILABLE":
      return AppState.NETWORK_UNAVAILABLE;
    case "CONNECTED_TO_WALLET":
      return AppState.CONNECTED_TO_WALLET;
    case "SELECTED_CURRENCY":
      return AppState.SELECTED_CURRENCY;
    case "ENTERED_AMOUNTS":
      return AppState.ENTERED_AMOUNTS;
    default:
      return AppState.CONNECTED_TO_WALLET;
  }
}