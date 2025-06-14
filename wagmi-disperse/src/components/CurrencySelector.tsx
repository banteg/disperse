import type { ChangeEvent } from "react";
import { useChainId } from "wagmi";
import { nativeCurrencyName } from "../networks";
import { useCurrency } from "../store";

interface CurrencySelectorProps {
  onSelect: (type: "ether" | "token") => void;
}

const CurrencySelector = ({ onSelect }: CurrencySelectorProps) => {
  const { sending } = useCurrency();
  const chainId = useChainId();

  // Get native currency name for display
  const nativeCurrency = nativeCurrencyName(chainId);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "ether" | "token";
    onSelect(value);
  };

  return (
    <div className="chooser">
      <span>send</span>
      <input type="radio" id="ether" name="what" value="ether" checked={sending === "ether"} onChange={handleChange} />
      <label htmlFor="ether">{nativeCurrency}</label>
      <span>or</span>
      <input type="radio" id="token" name="what" value="token" checked={sending === "token"} onChange={handleChange} />
      <label htmlFor="token">token</label>
    </div>
  );
};

export default CurrencySelector;
