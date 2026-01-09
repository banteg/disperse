import { memo, useCallback, useRef } from "react";
import type { RefObject } from "react";
import type { Recipient, TokenInfo } from "../types";
import { getDecimals } from "../utils/balanceCalculations";
import { parseRecipients } from "../utils/parseRecipients";

interface RecipientInputProps {
  sending: "ether" | "token" | null;
  token: TokenInfo;
  onRecipientsChange: (recipients: Recipient[]) => void;
  textareaRef?: RefObject<HTMLTextAreaElement>;
}

const RecipientInput = ({ sending, token, onRecipientsChange, textareaRef }: RecipientInputProps) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const resolvedRef = textareaRef ?? internalRef;
  const symbol = sending === "token" ? token.symbol || "???" : "ETH";

  const parseAmounts = useCallback(() => {
    if (!resolvedRef.current) return;

    const text = resolvedRef.current.value;
    const decimals = getDecimals(sending, token);
    const newRecipients = parseRecipients(text, decimals);

    onRecipientsChange(newRecipients);
  }, [sending, token, onRecipientsChange, resolvedRef]);

  return (
    <section>
      <h2>recipients and amounts</h2>
      <p>enter one address and amount in {symbol} on each line. supports any format.</p>
      <div className="shadow">
        <textarea
          ref={resolvedRef}
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
