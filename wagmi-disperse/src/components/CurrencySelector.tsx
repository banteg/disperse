import { useState, useEffect, ChangeEvent } from 'react'

interface CurrencySelectorProps {
  onSelect: (type: 'ether' | 'token') => void
}

const CurrencySelector = ({ onSelect }: CurrencySelectorProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'ether' | 'token'>('ether')

  // Initialize with ether selected by default - only once on mount
  useEffect(() => {
    // This should only run once on component mount
    onSelect('ether')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - run only once on mount

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'ether' | 'token'
    setSelectedCurrency(value)
    onSelect(value)
  }

  return (
    <div className="chooser">
      <label>send</label>
      <input
        type="radio"
        id="ether"
        name="what"
        value="ether"
        checked={selectedCurrency === 'ether'}
        onChange={handleChange}
      />
      <label htmlFor="ether">ether</label>
      <label>or</label>
      <input
        type="radio"
        id="token"
        name="what"
        value="token"
        checked={selectedCurrency === 'token'}
        onChange={handleChange}
      />
      <label htmlFor="token">token</label>
    </div>
  )
}

export default CurrencySelector