import React, { useState, useEffect } from 'react';
import { parseAddressAmountInput, ParsedRecipient, formatAmount } from '../utils/parseInput';
import { TokenInfo } from '../hooks/useToken';
import { useAccount, useBalance } from 'wagmi';

interface AddressInputProps {
  isVisible: boolean;
  tokenInfo: TokenInfo | null;
  selectedCurrency: 'ETH' | 'TOKEN';
  onRecipientsChanged: (recipients: ParsedRecipient[], totalAmount: bigint) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({
  isVisible,
  tokenInfo,
  selectedCurrency,
  onRecipientsChanged
}) => {
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { address } = useAccount();

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address,
    query: {
      enabled: selectedCurrency === 'ETH' && Boolean(address)
    }
  });

  useEffect(() => {
    if (!isVisible || !input.trim()) return;

    const decimals = selectedCurrency === 'ETH' ? 18 : (tokenInfo?.decimals || 18);
    const { recipients, totalAmount, errors } = parseAddressAmountInput(input, decimals);
    
    setErrors(errors);
    
    if (recipients.length > 0 && errors.length === 0) {
      onRecipientsChanged(recipients, totalAmount);
    } else {
      onRecipientsChanged([], BigInt(0));
    }
  }, [input, selectedCurrency, tokenInfo, isVisible, onRecipientsChanged]);

  if (!isVisible) {
    return null;
  }

  // Determine current balance
  const currentBalance = selectedCurrency === 'ETH' 
    ? ethBalance?.value || BigInt(0) 
    : tokenInfo?.balance || BigInt(0);

  // Determine currency symbol for display
  const currencySymbol = selectedCurrency === 'ETH' 
    ? (ethBalance?.symbol || 'ETH') 
    : (tokenInfo?.symbol || 'tokens');

  return (
    <div>
      <h2>recipients</h2>
      
      <textarea 
        className="textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter one address and amount per line. supported formats:
0x2b1F577230F4D72B3818895688b8C25125A8f6c3 1.5
0x2b1F577230F4D72B3818895688b8C25125A8f6c3,1.5
0x2b1F577230F4D72B3818895688b8C25125A8f6c3=1.5"
        rows={6}
      />
      
      {errors.length > 0 && (
        <div className="error">
          <p>errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Current balance info */}
      <div className="flex justify-between">
        <div className="accent">
          your balance: {formatAmount(currentBalance, selectedCurrency === 'ETH' ? 18 : (tokenInfo?.decimals || 18))} {currencySymbol}
        </div>
        
        {/* Show total amount being sent if input is valid */}
        {input.trim() && errors.length === 0 && (
          <div>
            {(() => {
              const decimals = selectedCurrency === 'ETH' ? 18 : (tokenInfo?.decimals || 18);
              const { totalAmount } = parseAddressAmountInput(input, decimals);
              const formattedTotal = formatAmount(totalAmount, decimals);
              
              // Check if sending more than balance
              const isOverBalance = totalAmount > currentBalance;
              
              return (
                <span className={isOverBalance ? 'negative' : 'accent'}>
                  total: {formattedTotal} {currencySymbol}
                  {isOverBalance && ' (exceeds balance)'}
                </span>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressInput;