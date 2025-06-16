import { describe, it, expect } from 'vitest'
import { parseRecipients, isValidAddress, getTotalAmount, formatError, BaseError } from './utils'

describe('parseRecipients', () => {
  it('should parse comma-separated addresses and amounts', () => {
    const input = '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD8e,1.5'
    const recipients = parseRecipients(input, 18)
    
    expect(recipients).toHaveLength(1)
    expect(recipients[0].address.toLowerCase()).toBe('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD8e'.toLowerCase())
    expect(recipients[0].value).toBe(1500000000000000000n)
  })

  it('should parse space-separated addresses and amounts', () => {
    const input = '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD8e 2.5'
    const recipients = parseRecipients(input, 18)
    
    expect(recipients).toHaveLength(1)
    expect(recipients[0].address.toLowerCase()).toBe('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD8e'.toLowerCase())
    expect(recipients[0].value).toBe(2500000000000000000n)
  })

  it('should parse multiple recipients on separate lines', () => {
    const input = `0x742d35Cc6634C0532925a3b844Bc9e7595f2bD8e,1
0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed=2`
    const recipients = parseRecipients(input, 18)
    
    expect(recipients).toHaveLength(2)
    expect(recipients[0].value).toBe(1000000000000000000n)
    expect(recipients[1].value).toBe(2000000000000000000n)
  })

  it('should handle invalid addresses', () => {
    const input = 'invalid-address,1'
    const recipients = parseRecipients(input, 18)
    
    expect(recipients).toHaveLength(0)
  })
})

describe('isValidAddress', () => {
  it('should validate correct addresses', () => {
    // Viem's isAddress is strict about checksums, lowercase addresses are valid
    expect(isValidAddress('0x742d35cc6634c0532925a3b844bc9e7595f2bd8e')).toBe(true)
    expect(isValidAddress('0x0000000000000000000000000000000000000000')).toBe(true)
  })

  it('should reject invalid addresses', () => {
    expect(isValidAddress('0x123')).toBe(false)
    expect(isValidAddress('not-an-address')).toBe(false)
    expect(isValidAddress('')).toBe(false)
    expect(isValidAddress(null as any)).toBe(false)
  })
})

describe('getTotalAmount', () => {
  it('should calculate total amount correctly', () => {
    const recipients = [
      { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD8e' as `0x${string}`, value: 1000000000000000000n },
      { address: '0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed' as `0x${string}`, value: 2000000000000000000n },
    ]
    
    expect(getTotalAmount(recipients)).toBe(3000000000000000000n)
  })

  it('should return 0 for empty array', () => {
    expect(getTotalAmount([])).toBe(0n)
  })
})

describe('formatError', () => {
  it('should format BaseError with shortMessage', () => {
    const error = new BaseError(
      'MetaMask Tx Signature: User denied transaction signature.',
      'User rejected transaction'
    )
    
    expect(formatError(error)).toBe('User rejected transaction')
  })

  it('should use message if shortMessage not available', () => {
    const error = new BaseError('Transaction failed')
    
    expect(formatError(error)).toBe('Transaction failed')
  })

  it('should handle Error objects', () => {
    const error = new Error('Something went wrong')
    
    expect(formatError(error)).toBe('Something went wrong')
  })

  it('should handle unknown error types', () => {
    expect(formatError('string error')).toBe('string error') // Returns the string itself
    expect(formatError(null)).toBe('An unexpected error occurred')
    expect(formatError(undefined)).toBe('An unexpected error occurred')
  })
})