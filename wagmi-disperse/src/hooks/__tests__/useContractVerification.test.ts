import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useContractVerification } from "../useContractVerification";

// Mock wagmi hooks
vi.mock("wagmi", () => ({
  useBytecode: vi.fn(),
}));

// Mock deploy data
vi.mock("../../deploy", () => ({
  disperse_legacy: { address: "0x1111111111111111111111111111111111111111" },
  disperse_createx: { address: "0x2222222222222222222222222222222222222222" },
  disperse_runtime: "0x608060405234801561001057600080fd5b50",
}));

// Mock contract verification utility
vi.mock("../../utils/contractVerify", () => ({
  isDisperseContract: vi.fn(),
}));

// Mock console.log to avoid noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});

import { useBytecode } from "wagmi";
import { isDisperseContract } from "../../utils/contractVerify";

const mockUseBytecode = vi.mocked(useBytecode);
const mockIsDisperseContract = vi.mocked(isDisperseContract);

describe("useContractVerification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBytecode.mockReturnValue({ data: undefined, isLoading: false } as any);
    mockIsDisperseContract.mockReturnValue(false);
  });

  it("should check legacy address first", () => {
    const { result } = renderHook(() => useContractVerification(1, true));

    expect(mockUseBytecode).toHaveBeenCalledWith({
      address: "0x1111111111111111111111111111111111111111",
      chainId: 1,
      query: {
        enabled: true,
      },
    });

    expect(result.current.legacyDisperseAddress).toBe("0x1111111111111111111111111111111111111111");
    expect(result.current.createxDisperseAddress).toBe("0x2222222222222222222222222222222222222222");
  });

  it("should return null verified address when no contract found", () => {
    mockUseBytecode.mockReturnValue({ data: "0x", isLoading: false } as any);

    const { result } = renderHook(() => useContractVerification(1, true));

    expect(result.current.verifiedAddress).toBeNull();
    expect(result.current.isContractDeployed).toBe(false);
  });

  it("should verify contract when valid bytecode found", async () => {
    mockUseBytecode.mockReturnValue({
      data: "0x608060405234801561001057600080fd5b50",
      isLoading: false,
    } as any);
    mockIsDisperseContract.mockReturnValue(true);

    const { result } = renderHook(() => useContractVerification(1, true));

    await waitFor(() => {
      expect(result.current.verifiedAddress).toEqual({
        address: "0x1111111111111111111111111111111111111111",
        label: "legacy",
      });
      expect(result.current.isContractDeployed).toBe(true);
    });
  });

  it.skip("should check createx address if legacy not found", async () => {
    // Mock sequence: first check legacy (empty), then check createx (valid)
    let callCount = 0;
    mockUseBytecode.mockImplementation(({ address }) => {
      callCount++;
      if (address === "0x1111111111111111111111111111111111111111") {
        // Legacy address check - no contract
        return { data: "0x", isLoading: false } as any;
      }
      if (address === "0x2222222222222222222222222222222222222222") {
        // CreateX address check - has contract
        return {
          data: "0x608060405234801561001057600080fd5b50",
          isLoading: false,
        } as any;
      }
      return { data: undefined, isLoading: false } as any;
    });

    mockIsDisperseContract
      .mockReturnValueOnce(false) // legacy check fails
      .mockReturnValueOnce(true); // createx check succeeds

    const { result } = renderHook(() => useContractVerification(1, true));

    await waitFor(
      () => {
        expect(result.current.verifiedAddress).toEqual({
          address: "0x2222222222222222222222222222222222222222",
          label: "createx",
        });
      },
      { timeout: 2000 },
    );
  });

  it("should check custom address when provided", async () => {
    const customAddress = "0x3333333333333333333333333333333333333333" as `0x${string}`;

    mockUseBytecode.mockReturnValue({
      data: "0x608060405234801561001057600080fd5b50",
      isLoading: false,
    } as any);
    mockIsDisperseContract.mockReturnValue(true);

    const { result } = renderHook(() => useContractVerification(1, true, customAddress));

    expect(result.current.potentialAddresses).toHaveLength(3);
    expect(result.current.potentialAddresses[2]).toEqual({
      address: customAddress,
      label: "custom",
    });
  });

  it("should reset verification when chain changes", async () => {
    mockUseBytecode.mockReturnValue({
      data: "0x608060405234801561001057600080fd5b50",
      isLoading: false,
    } as any);
    mockIsDisperseContract.mockReturnValue(true);

    const { result, rerender } = renderHook(
      ({ chainId, isConnected }) => useContractVerification(chainId, isConnected),
      {
        initialProps: { chainId: 1, isConnected: true },
      },
    );

    await waitFor(() => {
      expect(result.current.verifiedAddress).toBeTruthy();
    });

    // Change chain - this should reset verification
    mockUseBytecode.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as any);

    rerender({ chainId: 137, isConnected: true });

    // The verification should be reset immediately upon chain change
    expect(result.current.verifiedAddress).toBeNull();
  });

  it("should not check when not connected", () => {
    renderHook(() => useContractVerification(1, false));

    expect(mockUseBytecode).toHaveBeenCalledWith({
      address: expect.any(String),
      chainId: 1,
      query: {
        enabled: false, // Should be disabled when not connected
      },
    });
  });

  it("should handle loading state", () => {
    mockUseBytecode.mockReturnValue({ data: undefined, isLoading: true } as any);

    const { result } = renderHook(() => useContractVerification(1, true));

    expect(result.current.isBytecodeLoading).toBe(true);
    expect(result.current.verifiedAddress).toBeNull();
  });

  it("should handle invalid contract bytecode", async () => {
    mockUseBytecode.mockReturnValue({
      data: "0xdeadbeef",
      isLoading: false,
    } as any);
    mockIsDisperseContract.mockReturnValue(false);

    const { result } = renderHook(() => useContractVerification(1, true));

    await waitFor(() => {
      expect(result.current.verifiedAddress).toBeNull();
      expect(result.current.isContractDeployed).toBe(false);
    });
  });

  it("should stop loading once contract is found", async () => {
    mockUseBytecode.mockReturnValue({
      data: "0x608060405234801561001057600080fd5b50",
      isLoading: false,
    } as any);
    mockIsDisperseContract.mockReturnValue(true);

    const { result } = renderHook(() => useContractVerification(1, true));

    await waitFor(() => {
      expect(result.current.verifiedAddress).toBeTruthy();
      expect(result.current.isBytecodeLoading).toBe(false);
    });
  });

  it("should always have contract address (fallback to legacy)", () => {
    const { result } = renderHook(() => useContractVerification(1, true));

    expect(result.current.hasContractAddress).toBe(true);
    // Should default to legacy address when no verified address
    expect(result.current.contractAddress).toBe("0x1111111111111111111111111111111111111111");
  });

  it("should handle undefined chain ID", () => {
    const { result } = renderHook(() => useContractVerification(undefined, true));

    expect(result.current.verifiedAddress).toBeNull();
    expect(result.current.isContractDeployed).toBe(false);
  });

  it("should provide handleContractDeployed callback", () => {
    const { result } = renderHook(() => useContractVerification(1, true));

    expect(typeof result.current.handleContractDeployed).toBe("function");

    // Test the callback doesn't throw
    expect(() => {
      result.current.handleContractDeployed("0x4444444444444444444444444444444444444444" as `0x${string}`);
    }).not.toThrow();
  });
});
