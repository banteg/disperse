import { describe, expect, it } from "vitest";
import type { Recipient, TokenInfo } from "../../types";
import {
  formatBalance,
  getBalance,
  getDecimals,
  getDisperseMessage,
  getLeftAmount,
  getNativeCurrencyName,
  getSymbol,
  getTotalAmount,
} from "../balanceCalculations";

describe("getTotalAmount", () => {
  it("should return 0 for empty recipients", () => {
    expect(getTotalAmount([])).toBe(0n);
  });

  it("should calculate total for single recipient", () => {
    const recipients: Recipient[] = [{ address: "0x1234567890123456789012345678901234567890", value: 1000n }];
    expect(getTotalAmount(recipients)).toBe(1000n);
  });

  it("should calculate total for multiple recipients", () => {
    const recipients: Recipient[] = [
      { address: "0x1234567890123456789012345678901234567890", value: 1000n },
      { address: "0x2345678901234567890123456789012345678901", value: 2500n },
      { address: "0x3456789012345678901234567890123456789012", value: 500n },
    ];
    expect(getTotalAmount(recipients)).toBe(4000n);
  });
});

describe("getBalance", () => {
  const mockToken: TokenInfo = {
    balance: 5000n,
    decimals: 18,
    symbol: "TEST",
  };

  const mockBalanceData = { value: 10000n };

  it("should return token balance when sending token", () => {
    expect(getBalance("token", mockToken, mockBalanceData)).toBe(5000n);
  });

  it("should return ETH balance when sending ether", () => {
    expect(getBalance("ether", mockToken, mockBalanceData)).toBe(10000n);
  });

  it("should return 0 when token balance is undefined", () => {
    expect(getBalance("token", {}, mockBalanceData)).toBe(0n);
  });

  it("should return 0 when ETH balance data is undefined", () => {
    expect(getBalance("ether", mockToken, undefined)).toBe(0n);
  });

  it("should return ETH balance when sending is null", () => {
    expect(getBalance(null, mockToken, mockBalanceData)).toBe(10000n);
  });
});

describe("getLeftAmount", () => {
  const recipients: Recipient[] = [{ address: "0x1234567890123456789012345678901234567890", value: 3000n }];

  const mockToken: TokenInfo = {
    balance: 5000n,
    decimals: 18,
    symbol: "TEST",
  };

  const mockBalanceData = { value: 10000n };

  it("should calculate remaining token balance", () => {
    expect(getLeftAmount(recipients, "token", mockToken, mockBalanceData)).toBe(2000n);
  });

  it("should calculate remaining ETH balance", () => {
    expect(getLeftAmount(recipients, "ether", mockToken, mockBalanceData)).toBe(7000n);
  });

  it("should return negative when total exceeds balance", () => {
    const largeRecipients: Recipient[] = [{ address: "0x1234567890123456789012345678901234567890", value: 15000n }];
    expect(getLeftAmount(largeRecipients, "ether", mockToken, mockBalanceData)).toBe(-5000n);
  });
});

describe("getDisperseMessage", () => {
  const recipients: Recipient[] = [{ address: "0x1234567890123456789012345678901234567890", value: 3000n }];

  const mockToken: TokenInfo = {
    balance: 5000n,
    allowance: 2000n,
    decimals: 18,
    symbol: "TEST",
  };

  const mockBalanceData = { value: 10000n };

  it("should return needs allowance message when allowance insufficient", () => {
    expect(getDisperseMessage(recipients, "token", mockToken, mockBalanceData)).toBe("needs allowance");
  });

  it("should return exceeds balance message when total exceeds balance", () => {
    const largeRecipients: Recipient[] = [{ address: "0x1234567890123456789012345678901234567890", value: 15000n }];
    expect(getDisperseMessage(largeRecipients, "ether", mockToken, mockBalanceData)).toBe("total exceeds balance");
  });

  it("should return undefined when everything is valid", () => {
    const tokenWithAllowance: TokenInfo = { ...mockToken, allowance: 5000n };
    expect(getDisperseMessage(recipients, "token", tokenWithAllowance, mockBalanceData)).toBeUndefined();
  });

  it("should handle undefined allowance as 0", () => {
    const tokenNoAllowance: TokenInfo = { ...mockToken, allowance: undefined };
    expect(getDisperseMessage(recipients, "token", tokenNoAllowance, mockBalanceData)).toBe("needs allowance");
  });
});

describe("getNativeCurrencyName", () => {
  it("should return ether for mainnet", () => {
    expect(getNativeCurrencyName(1)).toBe("ether");
  });

  it("should return correct name for known chains", () => {
    expect(getNativeCurrencyName(137)).toBe("pol");
    expect(getNativeCurrencyName(56)).toBe("bnb");
  });

  it("should return ether for unknown chains", () => {
    expect(getNativeCurrencyName(999999)).toBe("ether");
  });

  it("should return ether for undefined", () => {
    expect(getNativeCurrencyName(undefined)).toBe("ether");
  });
});

describe("getSymbol", () => {
  const mockToken: TokenInfo = {
    symbol: "TEST",
    decimals: 18,
  };

  it("should return token symbol when sending token", () => {
    expect(getSymbol("token", mockToken, 1)).toBe("TEST");
  });

  it("should return ??? when token symbol is missing", () => {
    expect(getSymbol("token", {}, 1)).toBe("???");
  });

  it("should return native symbol when sending ether", () => {
    expect(getSymbol("ether", mockToken, 1)).toBe("ETH");
    expect(getSymbol("ether", mockToken, 137)).toBe("POL");
  });

  it("should return ETH when sending is null", () => {
    expect(getSymbol(null, mockToken, 1)).toBe("ETH");
  });
});

describe("getDecimals", () => {
  it("should return token decimals when sending token", () => {
    const mockToken: TokenInfo = { decimals: 6 };
    expect(getDecimals("token", mockToken)).toBe(6);
  });

  it("should return 18 when token decimals undefined", () => {
    expect(getDecimals("token", {})).toBe(18);
  });

  it("should return 18 when sending ether", () => {
    const mockToken: TokenInfo = { decimals: 6 };
    expect(getDecimals("ether", mockToken)).toBe(18);
  });

  it("should return 18 when sending is null", () => {
    const mockToken: TokenInfo = { decimals: 6 };
    expect(getDecimals(null, mockToken)).toBe(18);
  });
});

describe("formatBalance", () => {
  it("should format balance with 18 decimals", () => {
    expect(formatBalance(1000000000000000000n, 18, "ETH")).toBe("1 ETH");
  });

  it("should format balance with 6 decimals", () => {
    expect(formatBalance(1000000n, 6, "USDC")).toBe("1 USDC");
  });

  it("should format fractional amounts", () => {
    expect(formatBalance(1500000000000000000n, 18, "ETH")).toBe("1.5 ETH");
    expect(formatBalance(2500000n, 6, "USDC")).toBe("2.5 USDC");
  });

  it("should format zero balance", () => {
    expect(formatBalance(0n, 18, "ETH")).toBe("0 ETH");
  });
});
