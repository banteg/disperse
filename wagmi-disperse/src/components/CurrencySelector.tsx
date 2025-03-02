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
    <>
      <h2>what are you sending?</h2>
      <div className="flex">
        <label className="pr">
          <input 
            type="radio" 
            name="currency" 
            value="ether" 
            checked={selectedCurrency === 'ether'}
            onChange={handleChange} 
          />
          <span style={{ marginLeft: '5px' }}>ether</span>
        </label>
        <label>
          <input 
            type="radio" 
            name="currency" 
            value="token" 
            checked={selectedCurrency === 'token'}
            onChange={handleChange} 
          />
          <span style={{ marginLeft: '5px' }}>token</span>
        </label>
      </div>
    </>
  )
}

export default CurrencySelector