import { memo, useCallback, useRef } from "react";
import { useCurrency, useTransaction } from "../store";
import type { Recipient } from "../types";
import { getDecimals } from "../utils/balanceCalculations";
import { parseRecipients } from "../utils/parseRecipients";

interface RecipientInputProps {
  onRecipientsChange?: (recipients: Recipient[]) => void; // Optional callback for parent component
}

const RecipientInput = ({ onRecipientsChange }: RecipientInputProps) => {
  const { sending, token } = useCurrency();
  const { setRecipients } = useTransaction();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const symbol = sending === "token" ? token.symbol || "???" : "ETH";

  // biome-ignore lint/correctness/useExhaustiveDependencies: setRecipients is stable from Zustand
  const parseAmounts = useCallback(() => {
    if (!textareaRef.current) return;

    const text = textareaRef.current.value;
    const decimals = getDecimals(sending, token);
    const newRecipients = parseRecipients(text, decimals);

    setRecipients(newRecipients);

    // Keep compatibility with existing callback
    if (onRecipientsChange) {
      onRecipientsChange(newRecipients);
    }
  }, [sending, token, onRecipientsChange]); // setRecipients is stable from Zustand

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
    </section>
  );
};

export default memo(RecipientInput);
