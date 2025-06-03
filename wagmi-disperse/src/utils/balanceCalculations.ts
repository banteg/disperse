import { formatUnits } from "viem";
import { nativeCurrencyName, nativeSymbol } from "../networks";
import type { Recipient, TokenInfo } from "../types";

export function getTotalAmount(recipients: Recipient[]): bigint {
  return recipients.reduce((total, recipient) => total + recipient.value, 0n);
}

export function getBalance(
  sending: "ether" | "token" | null,
  token: TokenInfo,
  balanceData?: { value: bigint },
): bigint {
  if (sending === "token") {
    return token.balance ?? 0n;
  }
  return balanceData?.value ?? 0n;
}

export function getLeftAmount(
  recipients: Recipient[],
  sending: "ether" | "token" | null,
  token: TokenInfo,
  balanceData?: { value: bigint },
): bigint {
  return getBalance(sending, token, balanceData) - getTotalAmount(recipients);
}

export function getDisperseMessage(
  recipients: Recipient[],
  sending: "ether" | "token" | null,
  token: TokenInfo,
  balanceData?: { value: bigint },
): string | undefined {
  if (sending === "token" && (token.allowance ?? 0n) < getTotalAmount(recipients)) {
    return "needs allowance";
  }
  if (getLeftAmount(recipients, sending, token, balanceData) < 0n) {
    return "total exceeds balance";
  }
  return undefined;
}

export function getNativeCurrencyName(realChainId: number | undefined): string {
  return nativeCurrencyName(realChainId);
}

export function getSymbol(
  sending: "ether" | "token" | null,
  token: TokenInfo,
  realChainId: number | undefined,
): string {
  if (sending === "token") {
    return token.symbol || "???";
  }
  return nativeSymbol(realChainId);
}

export function getDecimals(sending: "ether" | "token" | null, token: TokenInfo): number {
  return sending === "token" ? (token.decimals ?? 18) : 18;
}

export function formatBalance(balance: bigint, decimals: number, symbol: string): string {
  return `${formatUnits(balance, decimals)} ${symbol}`;
}
