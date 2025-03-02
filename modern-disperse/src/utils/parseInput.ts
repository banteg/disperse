import { parseEther, parseUnits } from 'viem';

export interface ParsedRecipient {
  address: string;
  amount: bigint;
}

export function parseAddressAmountInput(
  input: string, 
  decimals: number = 18
): { 
  recipients: ParsedRecipient[],
  totalAmount: bigint,
  errors: string[] 
} {
  const lines = input.trim().split(/\n/).filter(Boolean);
  const recipients: ParsedRecipient[] = [];
  const errors: string[] = [];
  let totalAmount = BigInt(0);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Try different formats
    // Format: 0x123...abc amount
    const spaceSeparated = line.match(/^(0x[a-fA-F0-9]{40})\s+([0-9.]+)$/);
    if (spaceSeparated) {
      try {
        const address = spaceSeparated[1].toLowerCase();
        const amountString = spaceSeparated[2];
        const amount = parseUnits(amountString, decimals);
        
        recipients.push({ address, amount });
        totalAmount += amount;
        continue;
      } catch (e) {
        errors.push(`Line ${i + 1}: Invalid amount format`);
        continue;
      }
    }
    
    // Format: 0x123...abc,amount
    const commaSeparated = line.match(/^(0x[a-fA-F0-9]{40}),([0-9.]+)$/);
    if (commaSeparated) {
      try {
        const address = commaSeparated[1].toLowerCase();
        const amountString = commaSeparated[2];
        const amount = parseUnits(amountString, decimals);
        
        recipients.push({ address, amount });
        totalAmount += amount;
        continue;
      } catch (e) {
        errors.push(`Line ${i + 1}: Invalid amount format`);
        continue;
      }
    }
    
    // Format: 0x123...abc=amount
    const equalSeparated = line.match(/^(0x[a-fA-F0-9]{40})=([0-9.]+)$/);
    if (equalSeparated) {
      try {
        const address = equalSeparated[1].toLowerCase();
        const amountString = equalSeparated[2];
        const amount = parseUnits(amountString, decimals);
        
        recipients.push({ address, amount });
        totalAmount += amount;
        continue;
      } catch (e) {
        errors.push(`Line ${i + 1}: Invalid amount format`);
        continue;
      }
    }
    
    errors.push(`Line ${i + 1}: Invalid format. Use "address amount", "address,amount" or "address=amount"`);
  }
  
  return { recipients, totalAmount, errors };
}

export function formatAmount(amount: bigint, decimals: number): string {
  if (!amount) return '0';
  
  // Convert to string and pad with zeros if needed
  let amountStr = amount.toString();
  while (amountStr.length <= decimals) {
    amountStr = '0' + amountStr;
  }
  
  // Insert decimal point
  const integerPart = amountStr.slice(0, amountStr.length - decimals) || '0';
  const fractionalPart = amountStr.slice(amountStr.length - decimals);
  
  // Trim trailing zeros in fractional part
  const trimmedFractional = fractionalPart.replace(/0+$/, '');
  
  if (trimmedFractional.length === 0) {
    return integerPart;
  }
  
  return `${integerPart}.${trimmedFractional}`;
}