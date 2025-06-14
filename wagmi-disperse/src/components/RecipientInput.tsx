import { memo, useCallback, useRef, useEffect } from "react";
import type { Recipient } from "../types"; // TokenInfo will be from store
import { getDecimals } from "../utils/balanceCalculations";
import { parseRecipients } from "../utils/parseRecipients";
import { useAppStore } from "../../store/appStore";

interface RecipientInputProps {
  // sending and token will be sourced from store
  onRecipientsChange: (recipients: Recipient[]) => void;
}

const RecipientInput = ({ onRecipientsChange }: RecipientInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sending = useAppStore((state) => state.sending);
  const token = useAppStore((state) => state.token);
  const textareaValue = useAppStore((state) => state.textareaValue);
  const setTextareaValue = useAppStore((state) => state.setTextareaValue);

  const symbol = sending === "token" ? token.symbol || "???" : "ETH";

  // Sync textarea with store value if it changes externally
  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value !== textareaValue) {
      textareaRef.current.value = textareaValue;
    }
  }, [textareaValue]);

  const handleInputChange = useCallback(() => {
    if (!textareaRef.current) return;
    const text = textareaRef.current.value;
    setTextareaValue(text); // Update store with current textarea content

    // Determine decimals based on current sending type and token from the store
    const currentSending = useAppStore.getState().sending;
    const currentToken = useAppStore.getState().token;
    const decimals = getDecimals(currentSending, currentToken);
    const newRecipients = parseRecipients(text, decimals);

    onRecipientsChange(newRecipients);
  }, [setTextareaValue, onRecipientsChange]);


  return (
    <section>
      <h2>recipients and amounts</h2>
      <p>enter one address and amount in {symbol} on each line. supports any format.</p>
      <div className="shadow">
        <textarea
          ref={textareaRef}
          spellCheck="false"
          onChange={handleInputChange} // Changed from parseAmounts to handleInputChange
          defaultValue={textareaValue} // Set initial value from store
          id="recipients-textarea"
          placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"
        />
      </div>
    </section>
  );
};

export default memo(RecipientInput);
