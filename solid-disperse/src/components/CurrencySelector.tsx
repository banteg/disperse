import { createSignal } from 'solid-js'
import { chainId as chainIdSignal } from '../web3.store'
import { nativeCurrencyName } from '../networks'

interface CurrencySelectorProps {
  onSelect: (type: 'ether' | 'token') => void
}

const CurrencySelector = (props: CurrencySelectorProps) => {
  const [selectedCurrency, setSelectedCurrency] = createSignal<'ether' | 'token'>('ether')

  // Get native currency name for display
  const nativeCurrency = () => nativeCurrencyName(chainIdSignal())

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value as 'ether' | 'token'
    setSelectedCurrency(value)
    props.onSelect(value)
  }

  return (
    <div class="chooser">
      <span>send</span>
      <input
        type="radio"
        id="ether"
        name="what"
        value="ether"
        checked={selectedCurrency() === 'ether'}
        onChange={handleChange}
      />
      <label for="ether">{nativeCurrency()}</label>
      <span>or</span>
      <input
        type="radio"
        id="token"
        name="what"
        value="token"
        checked={selectedCurrency() === 'token'}
        onChange={handleChange}
      />
      <label for="token">token</label>
    </div>
  )
}

export default CurrencySelector