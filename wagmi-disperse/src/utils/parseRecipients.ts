import { isAddress, parseUnits } from "viem";
import type { Recipient } from "../types";

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

export function parseRecipients(text: string, decimals: number): Recipient[] {
  debug("Parsing amounts from textarea");

  const pattern = /(0x[0-9a-fA-F]{40})[,\s=:;]+([0-9]+(?:\.[0-9]+)?)/g;
  const newRecipients: Recipient[] = [];
  let result: RegExpExecArray | null;

  try {
    result = pattern.exec(text);
    while (result !== null) {
      const address = result[1].toLowerCase();
      if (isAddress(address)) {
        try {
          newRecipients.push({
            address: address as `0x${string}`,
            value: parseUnits(result[2], decimals),
          });
        } catch (e) {
          debug(`Error parsing amount for address ${address}:`, e);
        }
      }
      result = pattern.exec(text);
    }
  } catch (e) {
    debug("Error in regex parsing:", e);
  }

  debug(`Found ${newRecipients.length} recipients`, newRecipients);
  return newRecipients;
}
