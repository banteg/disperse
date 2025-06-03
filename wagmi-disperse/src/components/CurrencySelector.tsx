import { type ChangeEvent, useState } from "react";
import { useChainId } from "wagmi";
import { nativeCurrencyName } from "../networks";

interface CurrencySelectorProps {
  onSelect: (type: "ether" | "token") => void;
}

const CurrencySelector = ({ onSelect }: CurrencySelectorProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<"ether" | "token">("ether");
  const chainId = useChainId();

  // Get native currency name for display
  const nativeCurrency = nativeCurrencyName(chainId);

  // Don't auto-select ether on mount - this causes issues when switching back from token
  // The parent component should control the initial state instead

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "ether" | "token";
    setSelectedCurrency(value);
    onSelect(value);
  };

  return (
    <div className="chooser">
      <span>send</span>
      <input
        type="radio"
        id="ether"
        name="what"
        value="ether"
        checked={selectedCurrency === "ether"}
        onChange={handleChange}
      />
      <label htmlFor="ether">{nativeCurrency}</label>
      <span>or</span>
      <input
        type="radio"
        id="token"
        name="what"
        value="token"
        checked={selectedCurrency === "token"}
        onChange={handleChange}
      />
      <label htmlFor="token">token</label>
    </div>
  );
};

export default CurrencySelector;
