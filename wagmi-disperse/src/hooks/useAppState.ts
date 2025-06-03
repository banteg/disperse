import { useEffect, useState } from "react";
import { AppState } from "../constants";
import type { TokenInfo } from "../types";

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

interface UseAppStateProps {
  status: string;
  isConnected: boolean;
  realChainId: number | undefined;
  isChainSupported: boolean;
  isContractDeployed: boolean;
  isBytecodeLoading: boolean;
  hasContractAddress: boolean;
  sending: "ether" | "token" | null;
  token: TokenInfo;
}

export function useAppState({
  status,
  isConnected,
  realChainId,
  isChainSupported,
  isContractDeployed,
  isBytecodeLoading,
  hasContractAddress,
  sending,
  token,
}: UseAppStateProps) {
  const [appState, setAppState] = useState<AppState>(AppState.UNLOCK_WALLET);

  useEffect(() => {
    debug(`AppState changed to: ${AppState[appState]}`);
  }, [appState]);

  useEffect(() => {
    if (status === "reconnecting" || status === "connecting") return;
    if (sending === null) return;

    debug(
      `Wallet status: ${status}, isConnected: ${isConnected}, chainId: ${realChainId}, supported: ${isChainSupported}, contract: ${isContractDeployed}`,
    );

    if (status === "disconnected") {
      setAppState(AppState.UNLOCK_WALLET);
    } else if (isConnected && (!isContractDeployed || !isChainSupported)) {
      if (isBytecodeLoading && hasContractAddress) {
        return;
      }

      if (isContractDeployed) {
        debug(`Chain ${realChainId} has a valid Disperse contract despite not being in our built-in list`);

        if (sending === "ether") {
          setAppState(AppState.SELECTED_CURRENCY);
        } else if (sending === "token") {
          if (token.address && token.decimals !== undefined && token.symbol) {
            setAppState(AppState.SELECTED_CURRENCY);
          } else {
            setAppState(AppState.CONNECTED_TO_WALLET);
          }
        }
        return;
      }

      debug(`Chain ${realChainId} is not fully supported or contract is not valid`);
      setAppState(AppState.NETWORK_UNAVAILABLE);
    } else if (isConnected) {
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
  }, [
    status,
    isConnected,
    realChainId,
    isChainSupported,
    isContractDeployed,
    isBytecodeLoading,
    hasContractAddress,
    sending,
    token,
  ]);

  return { appState, setAppState };
}
