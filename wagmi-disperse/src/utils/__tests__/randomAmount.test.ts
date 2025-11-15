import { describe, it, expect } from 'vitest';
import { 
  generateRandomAmount, 
  generateAddressesWithRandomAmounts, 
  generateAddressesWithUniformAmount 
} from '../randomAmount';

describe('randomAmount', () => {
  describe('generateRandomAmount', () => {
    it('should generate random amount within specified range', () => {
      const min = 0.1;
      const max = 0.3;
      const decimalPlaces = 2;
      
      const result = generateRandomAmount(min, max, decimalPlaces);
      const numResult = parseFloat(result);
      
      expect(numResult).toBeGreaterThanOrEqual(min);
      expect(numResult).toBeLessThanOrEqual(max);
      expect(result.split('.')[1]?.length).toBe(decimalPlaces);
    });

    it('should handle 0 decimal places', () => {
      const result = generateRandomAmount(1, 5, 0);
      const numResult = parseFloat(result);
      
      expect(Number.isInteger(numResult)).toBe(true);
      expect(numResult).toBeGreaterThanOrEqual(1);
      expect(numResult).toBeLessThanOrEqual(5);
    });

    it('should throw error when minimum amount is greater than maximum amount', () => {
      expect(() => generateRandomAmount(5, 1, 2)).toThrow('Minimum amount must be less than maximum amount');
    });

    it('should throw error when decimal places are invalid', () => {
      expect(() => generateRandomAmount(1, 5, -1)).toThrow('Decimal places must be between 0 and 18');
      expect(() => generateRandomAmount(1, 5, 19)).toThrow('Decimal places must be between 0 and 18');
    });
  });

  describe('generateAddressesWithRandomAmounts', () => {
    it('should generate random amounts for address list', () => {
      const addresses = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0x1111111111111111111111111111111111111111'
      ];
      const min = 0.1;
      const max = 0.3;
      const decimalPlaces = 2;
      
      const result = generateAddressesWithRandomAmounts(addresses, min, max, decimalPlaces);
      const lines = result.split('\n');
      
      expect(lines).toHaveLength(3);
      
      lines.forEach(line => {
        const [address, amount] = line.split(' ');
        expect(addresses).toContain(address);
        expect(parseFloat(amount)).toBeGreaterThanOrEqual(min);
        expect(parseFloat(amount)).toBeLessThanOrEqual(max);
      });
    });
  });

  describe('generateAddressesWithUniformAmount', () => {
    it('should generate uniform amount for address list', () => {
      const addresses = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0x1111111111111111111111111111111111111111'
      ];
      const amount = 0.25;
      const decimalPlaces = 2;
      
      const result = generateAddressesWithUniformAmount(addresses, amount, decimalPlaces);
      const lines = result.split('\n');
      
      expect(lines).toHaveLength(3);
      
      lines.forEach(line => {
        const [address, lineAmount] = line.split(' ');
        expect(addresses).toContain(address);
        expect(lineAmount).toBe('0.25');
      });
    });

    it('should handle different decimal places correctly', () => {
      const addresses = ['0x1234567890123456789012345678901234567890'];
      const amount = 0.123456;
      const decimalPlaces = 4;
      
      const result = generateAddressesWithUniformAmount(addresses, amount, decimalPlaces);
      const [, lineAmount] = result.split(' ');
      
      expect(lineAmount).toBe('0.1235'); // Rounded to 4 decimal places
    });
  });
}); 