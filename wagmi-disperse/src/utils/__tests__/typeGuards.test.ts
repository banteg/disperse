import { describe, expect, it } from "vitest";
import { hasProperty, isValidAddress, isValidChain } from "../typeGuards";

describe("isValidAddress", () => {
  it("should return true for valid ethereum address", () => {
    expect(isValidAddress("0x0000000000000000000000000000000000000001")).toBe(true);
    expect(isValidAddress("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182")).toBe(true);
  });

  it("should return false for invalid addresses", () => {
    expect(isValidAddress("0x")).toBe(false);
    expect(isValidAddress("not an address")).toBe(false);
    expect(isValidAddress("0x00000000000000000000000000000000000000g1")).toBe(false); // invalid character
    expect(isValidAddress("0x000000000000000000000000000000000000001")).toBe(false); // too short
  });
});

describe("isValidChain", () => {
  it("should return true for valid chain object", () => {
    const validChain = {
      id: 1,
      name: "Ethereum",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
    };

    expect(isValidChain(validChain)).toBe(true);
  });

  it("should return false for invalid chain objects", () => {
    expect(isValidChain(null)).toBe(false);
    expect(isValidChain(undefined)).toBe(false);
    expect(isValidChain("not an object")).toBe(false);
    expect(isValidChain({})).toBe(false);
    expect(isValidChain({ id: "not a number", name: "test" })).toBe(false);
    expect(isValidChain({ id: 1, name: 123 })).toBe(false); // name not string
    expect(isValidChain({ id: 1, name: "test" })).toBe(false); // missing nativeCurrency
  });
});

describe("hasProperty", () => {
  it("should return true when object has property", () => {
    const obj = { foo: "bar", baz: undefined };

    expect(hasProperty(obj, "foo")).toBe(true);
    expect(hasProperty(obj, "baz")).toBe(true); // even if undefined
  });

  it("should return false when object does not have property", () => {
    const obj = { foo: "bar" };

    expect(hasProperty(obj, "baz")).toBe(false);
    expect(hasProperty(obj, "qux")).toBe(false);
  });

  it("should work with different property types", () => {
    const obj = {
      0: "numeric",
      [Symbol.for("test")]: "symbol",
    };

    expect(hasProperty(obj, 0)).toBe(true);
    expect(hasProperty(obj, Symbol.for("test"))).toBe(true);
  });
});
