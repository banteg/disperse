import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppState } from "../../constants";
import type { TokenInfo } from "../../types";
import { useAppState } from "../useAppState";

// Mock console.log to avoid noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});

describe("useAppState", () => {
  const createMockProps = (overrides = {}) => ({
    status: "connected" as const,
    isConnected: true,
    realChainId: 1,
    isChainSupported: true,
    isContractDeployed: true,
    isBytecodeLoading: false,
    hasContractAddress: true,
    sending: "ether" as const,
    token: {} as TokenInfo,
    ...overrides,
  });

  it("should return UNLOCK_WALLET when disconnected", () => {
    const { result } = renderHook(() => useAppState(createMockProps({ status: "disconnected", isConnected: false })));

    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);
  });

  it("should return NETWORK_UNAVAILABLE when chain not supported", () => {
    const { result } = renderHook(() =>
      useAppState(createMockProps({ isChainSupported: false, isContractDeployed: false })),
    );

    expect(result.current.appState).toBe(AppState.NETWORK_UNAVAILABLE);
  });

  it("should return NETWORK_UNAVAILABLE when contract not deployed", () => {
    const { result } = renderHook(() => useAppState(createMockProps({ isContractDeployed: false })));

    expect(result.current.appState).toBe(AppState.NETWORK_UNAVAILABLE);
  });

  it("should skip state update during bytecode loading", () => {
    const { result } = renderHook(() =>
      useAppState(
        createMockProps({
          isContractDeployed: false,
          isBytecodeLoading: true,
          hasContractAddress: true,
        }),
      ),
    );

    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);
  });

  it("should return SELECTED_CURRENCY when sending ether and connected", () => {
    const { result } = renderHook(() => useAppState(createMockProps()));

    expect(result.current.appState).toBe(AppState.SELECTED_CURRENCY);
  });

  it("should return SELECTED_CURRENCY when sending valid token", () => {
    const mockToken: TokenInfo = {
      address: "0x123",
      decimals: 18,
      symbol: "TEST",
    };

    const { result } = renderHook(() => useAppState(createMockProps({ sending: "token", token: mockToken })));

    expect(result.current.appState).toBe(AppState.SELECTED_CURRENCY);
  });

  it("should return CONNECTED_TO_WALLET when token missing required fields", () => {
    const incompleteToken: TokenInfo = {
      address: "0x123",
      // missing decimals and symbol
    };

    const { result } = renderHook(() => useAppState(createMockProps({ sending: "token", token: incompleteToken })));

    expect(result.current.appState).toBe(AppState.CONNECTED_TO_WALLET);
  });

  it("should handle token with undefined decimals", () => {
    const tokenNoDecimals: TokenInfo = {
      address: "0x123",
      decimals: undefined,
      symbol: "TEST",
    };

    const { result } = renderHook(() => useAppState(createMockProps({ sending: "token", token: tokenNoDecimals })));

    expect(result.current.appState).toBe(AppState.CONNECTED_TO_WALLET);
  });

  it("should handle reconnecting status", () => {
    const { result } = renderHook(() => useAppState(createMockProps({ status: "reconnecting" })));

    // Should remain in initial state
    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);
  });

  it("should handle connecting status", () => {
    const { result } = renderHook(() => useAppState(createMockProps({ status: "connecting" })));

    // Should remain in initial state
    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);
  });

  it("should handle null sending value", () => {
    const { result } = renderHook(() => useAppState(createMockProps({ sending: null })));

    // Should remain in initial state
    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);
  });

  it("should handle unsupported chain with valid contract", () => {
    const { result } = renderHook(() =>
      useAppState(
        createMockProps({
          isChainSupported: false,
          isContractDeployed: true,
          sending: "ether",
        }),
      ),
    );

    expect(result.current.appState).toBe(AppState.SELECTED_CURRENCY);
  });

  it("should update state when dependencies change", () => {
    const { result, rerender } = renderHook((props) => useAppState(props), {
      initialProps: createMockProps({ status: "disconnected", isConnected: false }),
    });

    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);

    // Simulate connection
    rerender(createMockProps());
    expect(result.current.appState).toBe(AppState.SELECTED_CURRENCY);
  });

  it.skip("should expose setAppState function", () => {
    const { result } = renderHook(() => useAppState(createMockProps()));

    expect(typeof result.current.setAppState).toBe("function");

    // Test manual state change wrapped in act
    // The hook will set to SELECTED_CURRENCY based on the default props
    expect(result.current.appState).toBe(AppState.SELECTED_CURRENCY);

    // Now test manual state change
    act(() => {
      result.current.setAppState(AppState.UNLOCK_WALLET);
    });
    expect(result.current.appState).toBe(AppState.UNLOCK_WALLET);
  });
});
