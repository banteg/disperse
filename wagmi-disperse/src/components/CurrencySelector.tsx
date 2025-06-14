import { type ChangeEvent } from "react";
import { useChainId } from "wagmi";
import { nativeCurrencyName } from "../networks";
import { useAppStore } from "../../store/appStore";

interface CurrencySelectorProps {
  onSelect: (type: "ether" | "token") => void;
}

const CurrencySelector = ({ onSelect }: CurrencySelectorProps) => {
  const chainId = useChainId();
  const sending = useAppStore((state) => state.sending);

  // Get native currency name for display
  const nativeCurrency = nativeCurrencyName(chainId);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "ether" | "token";
    // The local selectedCurrency state is removed.
    // The checked state is now driven by `sending` from the store.
    // Calling onSelect will trigger the logic in App.tsx, which updates the store.
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
        checked={sending === "ether"} // Controlled by Zustand store state
        onChange={handleChange}
      />
      <label htmlFor="ether">{nativeCurrency}</label>
      <span>or</span>
      <input
        type="radio"
        id="token"
        name="what"
        value="token"
        checked={sending === "token"} // Controlled by Zustand store state
        onChange={handleChange}
      />
      <label htmlFor="token">token</label>
    </div>
  );
};

export default CurrencySelector;
