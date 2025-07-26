export function generateRandomAmount(min: number, max: number, decimalPlaces: number): string {
  if (min >= max) {
    throw new Error("Minimum amount must be less than maximum amount");
  }
  
  if (decimalPlaces < 0 || decimalPlaces > 18) {
    throw new Error("Decimal places must be between 0 and 18");
  }
  

  const random = Math.random() * (max - min) + min;
  

  return random.toFixed(decimalPlaces);
}


export function generateAddressesWithRandomAmounts(
  addresses: string[],
  min: number,
  max: number,
  decimalPlaces: number
): string {
  return addresses
    .map(address => {
      const randomAmount = generateRandomAmount(min, max, decimalPlaces);
      return `${address} ${randomAmount}`;
    })
    .join('\n');
}


export function generateAddressesWithUniformAmount(
  addresses: string[],
  amount: number,
  decimalPlaces: number
): string {
  const formattedAmount = amount.toFixed(decimalPlaces);
  return addresses
    .map(address => `${address} ${formattedAmount}`)
    .join('\n');
} 