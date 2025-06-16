import { createMemo } from 'solid-js'
import type { Recipient, TokenInfo } from '../types'
import { getDecimals } from '../utils'
import { parseRecipients } from '../utils'

interface RecipientInputProps {
  sending: 'ether' | 'token' | null
  token: TokenInfo
  onRecipientsChange: (recipients: Recipient[]) => void
}

const RecipientInput = (props: RecipientInputProps) => {
  let textareaRef: HTMLTextAreaElement | undefined

  const symbol = createMemo(() => 
    props.sending === 'token' ? props.token.symbol || '???' : 'ETH'
  )

  const parseAmounts = () => {
    if (!textareaRef) return

    const text = textareaRef.value
    const decimals = getDecimals(props.sending, props.token)
    const newRecipients = parseRecipients(text, decimals)

    props.onRecipientsChange(newRecipients)
  }

  return (
    <section>
      <h2>recipients and amounts</h2>
      <p>enter one address and amount in {symbol()} on each line. supports any format.</p>
      <div class="shadow">
        <textarea
          ref={textareaRef}
          spellCheck={false}
          onInput={parseAmounts}
          id="recipients-textarea"
          placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182&#10;0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421"
        />
      </div>
    </section>
  )
}

export default RecipientInput