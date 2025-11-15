import { memo, useCallback, useRef, useState } from "react";
import type { Recipient, TokenInfo } from "../types";
import { getDecimals } from "../utils/balanceCalculations";
import { parseRecipients } from "../utils/parseRecipients";
import { generateAddressesWithRandomAmounts, generateAddressesWithUniformAmount } from "../utils/randomAmount";
import RandomAmountSettings from "./RandomAmountSettings";

interface RecipientInputProps {
  sending: "ether" | "token" | null;
  token: TokenInfo;
  onRecipientsChange: (recipients: Recipient[]) => void;
}

const RecipientInput = ({ sending, token, onRecipientsChange }: RecipientInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const symbol = sending === "token" ? token.symbol || "???" : "ETH";
  
  // Random amount settings state
  const [isRandomEnabled, setIsRandomEnabled] = useState(false);
  const [minAmount, setMinAmount] = useState("0.1");
  const [maxAmount, setMaxAmount] = useState("0.3");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [uniformAmount, setUniformAmount] = useState("0.2");

  const parseAmounts = useCallback(() => {
    if (!textareaRef.current) return;

    const text = textareaRef.current.value;
    const decimals = getDecimals(sending, token);
    const newRecipients = parseRecipients(text, decimals);

    onRecipientsChange(newRecipients);
  }, [sending, token, onRecipientsChange]);

  // Auto-add amounts functionality
  const autoAddAmounts = useCallback(() => {
    if (!textareaRef.current) return;

    const text = textareaRef.current.value;
    const lines = text.split('\n').filter((line: string) => line.trim());
    
    // Extract addresses (either from pure addresses or from existing address+amount pairs)
    const addresses = lines
      .map((line: string) => line.trim())
      .filter((line: string) => /^0x[a-fA-F0-9]{40}/.test(line))
      .map((line: string) => line.split(/[,\s=:;]+/)[0].toLowerCase());

    if (addresses.length === 0) return;

    let resultText = '';
    
    if (isRandomEnabled) {
      // Generate random amounts
      const min = parseFloat(minAmount) || 0.1;
      const max = parseFloat(maxAmount) || 0.3;
      resultText = generateAddressesWithRandomAmounts(addresses, min, max, decimalPlaces);
    } else {
      const amount = parseFloat(uniformAmount) || 0.2;
      const uniformAmountStr = uniformAmount || '0.2';
      const calculatedDecimals = Math.max(
        decimalPlaces,
        (uniformAmountStr.split('.')[1] || '').length
      );
      resultText = generateAddressesWithUniformAmount(addresses, amount, calculatedDecimals);
    }

    textareaRef.current.value = resultText;
    parseAmounts();
  }, [isRandomEnabled, minAmount, maxAmount, decimalPlaces, uniformAmount, parseAmounts]);



  return (
    <section>
      <h2>recipients and amounts</h2>
      <p>enter one address and amount in {symbol} on each line. supports any format.</p>
      
      <div className="shadow">
        <textarea
          ref={textareaRef}
          spellCheck="false"
          onChange={parseAmounts}
          id="recipients-textarea"
          placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"
        />
      </div>
      
      {/* Random amount settings */}
      <RandomAmountSettings
        isRandomEnabled={isRandomEnabled}
        onRandomToggle={setIsRandomEnabled}
        minAmount={minAmount}
        maxAmount={maxAmount}
        onMinAmountChange={setMinAmount}
        onMaxAmountChange={setMaxAmount}
        decimalPlaces={decimalPlaces}
        onDecimalPlacesChange={setDecimalPlaces}
      />
      
      {/* Uniform amount setting (shown when random is disabled) */}
      {!isRandomEnabled && (
        <div className="uniform-amount-setting">
          <label>amount</label>
          <input
            type="number"
            step="0.0000000001"
            min="0"
            value={uniformAmount}
            onChange={(e) => setUniformAmount(e.target.value)}
            placeholder="0.2"
          />
        </div>
      )}
      
      <div className="auto-add-section">
        <button 
          type="button" 
          className="auto-add-button"
          onClick={autoAddAmounts}
        >
          auto add amounts
        </button>
        <span className="auto-add-note">
          enter addresses only, then click to add amounts automatically
        </span>
      </div>
    </section>
  );
};

export default memo(RecipientInput);
