import { beforeEach, describe, expect, it, vi } from "vitest";
import { canDeployToNetwork, getDisperseAddresses, isDisperseContract } from "../contractVerify";

// Mock deploy data
vi.mock("../../deploy", () => ({
  disperse_legacy: { address: "0x1111111111111111111111111111111111111111" },
  disperse_createx: { address: "0x2222222222222222222222222222222222222222" },
  disperse_runtime: "0x608060405234801561001057600080fd5b50",
}));

// Mock console.log to avoid noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});

describe("isDisperseContract", () => {
  beforeEach(() => {
    // Clear the cache before each test
    const func = isDisperseContract as typeof isDisperseContract & { cache?: Map<string, boolean> };
    if (func.cache) {
      func.cache.clear();
    }
  });

  it("should return false for undefined bytecode", () => {
    expect(isDisperseContract(undefined)).toBe(false);
  });

  it("should return false for empty bytecode", () => {
    expect(isDisperseContract("")).toBe(false);
    expect(isDisperseContract("0x")).toBe(false);
  });

  it("should return true for exact runtime match", () => {
    expect(isDisperseContract("0x608060405234801561001057600080fd5b50")).toBe(true);
  });

  it("should return true for bytecode starting with runtime", () => {
    const extendedBytecode = "0x608060405234801561001057600080fd5b50" + "deadbeef";
    expect(isDisperseContract(extendedBytecode)).toBe(true);
  });

  it("should return false for bytecode not matching runtime", () => {
    expect(isDisperseContract("0xdeadbeef")).toBe(false);
  });

  it("should handle bytecode without 0x prefix", () => {
    expect(isDisperseContract("608060405234801561001057600080fd5b50")).toBe(true);
  });

  it("should cache results for performance", () => {
    const bytecode = "0x608060405234801561001057600080fd5b50";

    // First call
    const result1 = isDisperseContract(bytecode);
    expect(result1).toBe(true);

    // Second call should use cache
    const result2 = isDisperseContract(bytecode);
    expect(result2).toBe(true);

    // Check cache exists
    const func = isDisperseContract as typeof isDisperseContract & { cache?: Map<string, boolean> };
    expect(func.cache?.has(bytecode)).toBe(true);
  });

  it("should handle partial match correctly", () => {
    // Bytecode that starts similar but diverges
    const partialMatch = "0x608060405234801561001057600080fd5b" + "99"; // Changed last byte
    expect(isDisperseContract(partialMatch)).toBe(false);
  });

  it("should be case insensitive for hex values", () => {
    const upperCaseBytecode = "0x608060405234801561001057600080FD5B50";
    expect(isDisperseContract(upperCaseBytecode)).toBe(true);
  });
});

describe("getDisperseAddresses", () => {
  it("should return both legacy and createx addresses", () => {
    const addresses = getDisperseAddresses();

    expect(addresses).toHaveLength(2);
    expect(addresses[0]).toEqual({
      address: "0x1111111111111111111111111111111111111111",
      label: "legacy",
    });
    expect(addresses[1]).toEqual({
      address: "0x2222222222222222222222222222222222222222",
      label: "createx",
    });
  });
});

describe("canDeployToNetwork", () => {
  it("should return true for valid chain IDs", () => {
    expect(canDeployToNetwork(1)).toBe(true);
    expect(canDeployToNetwork(137)).toBe(true);
    expect(canDeployToNetwork(42161)).toBe(true);
  });

  it("should return false for undefined chain ID", () => {
    expect(canDeployToNetwork(undefined)).toBe(false);
  });

  it("should return true for any numeric chain ID", () => {
    expect(canDeployToNetwork(999999)).toBe(true);
    expect(canDeployToNetwork(1234567890)).toBe(true);
  });

  it("should return false for zero chain ID", () => {
    // Zero is falsy in JS, so it should return false
    expect(canDeployToNetwork(0)).toBe(false);
  });
});
