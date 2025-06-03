import { useEffect, useState } from "react";
import type { TokenInfo } from "../types";

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

export function useCurrencySelection() {
  const [sending, setSending] = useState<"ether" | "token" | null>(null);
  const [token, setToken] = useState<TokenInfo>({});

  useEffect(() => {
    debug(`Sending type changed to: ${sending}`);
  }, [sending]);

  useEffect(() => {
    debug("Token updated:", token);
  }, [token]);

  useEffect(() => {
    if (sending === null) {
      debug("Setting initial currency to ether");
      setSending("ether");
    }
  }, [sending]);

  return {
    sending,
    token,
    setSending,
    setToken,
  };
}
