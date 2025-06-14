import { isAddress, parseUnits } from "viem";
import type { Recipient } from "../types";

const debug = (message: string, data?: unknown) => {
  console.log(`[DEBUG] ${message}`, data || "");
};

// Pre-compile regex for better performance
const RECIPIENT_PATTERN = /(0x[0-9a-fA-F]{40})[,\s=:;]+([0-9]+(?:\.[0-9]+)?)/g;

export function parseRecipients(text: string, decimals: number): Recipient[] {
  debug("Parsing amounts from textarea");

  // Early return for empty input
  if (!text || text.trim().length === 0) {
    return [];
  }

  // For very large inputs, limit processing to prevent UI freezing
  const maxLength = 100000; // ~1000 recipients
  const processedText = text.length > maxLength ? text.substring(0, maxLength) : text;
  
  const newRecipients: Recipient[] = [];
  const seenAddresses = new Set<string>(); // Track duplicates
  
  // Reset regex state for new search
  RECIPIENT_PATTERN.lastIndex = 0;
  
  let result: RegExpExecArray | null;
  let iterations = 0;
  const maxIterations = 5000; // Prevent infinite loops

  try {
    while ((result = RECIPIENT_PATTERN.exec(processedText)) !== null && iterations < maxIterations) {
      iterations++;
      const address = result[1].toLowerCase();
      
      // Skip if not valid address or duplicate
      if (!isAddress(address) || seenAddresses.has(address)) {
        continue;
      }
      
      try {
        const value = parseUnits(result[2], decimals);
        newRecipients.push({
          address: address as `0x${string}`,
          value,
        });
        seenAddresses.add(address);
      } catch (e) {
        debug(`Error parsing amount for address ${address}:`, e);
      }
    }
  } catch (e) {
    debug("Error in regex parsing:", e);
  }

  if (iterations === maxIterations) {
    debug("Warning: Reached maximum iteration limit");
  }

  debug(`Found ${newRecipients.length} recipients`, newRecipients);
  return newRecipients;
}
