import React from 'react';
import { useDisperseContract } from '../hooks/useDisperseContract';
import { useToken } from '../hooks/useToken';
import { ParsedRecipient, formatAmount } from '../utils/parseInput';
import { TokenInfo } from '../hooks/useToken';

interface TransactionButtonProps {
  isVisible: boolean;
  selectedCurrency: 'ETH' | 'TOKEN';
  recipients: ParsedRecipient[];
  totalAmount: bigint;
  tokenInfo: TokenInfo | null;
}

const TransactionButton: React.FC<TransactionButtonProps> = ({
  isVisible,
  selectedCurrency,
  recipients,
  totalAmount,
  tokenInfo
}) => {
  const {
    disperseEther,
    disperseToken,
    isDisperseEtherLoading,
    isDisperseTokenLoading,
    isDisperseEtherSuccess,
    isDisperseTokenSuccess,
    disperseEtherError,
    disperseTokenError
  } = useDisperseContract();
  
  const {
    allowance,
    approveTokens,
    isApproveLoading,
    isApproveSuccess,
    approveError
  } = useToken();

  if (!isVisible || recipients.length === 0 || totalAmount === BigInt(0)) {
    return null;
  }

  // Format currency text
  const currencyText = selectedCurrency === 'ETH'
    ? 'ether'
    : tokenInfo ? tokenInfo.symbol.toLowerCase() : 'tokens';

  // Format amount
  const formattedAmount = formatAmount(
    totalAmount, 
    selectedCurrency === 'ETH' ? 18 : (tokenInfo?.decimals || 18)
  );

  // Function to handle the disperse action
  const handleDisperse = () => {
    if (selectedCurrency === 'ETH') {
      disperseEther(recipients, totalAmount);
    } else if (tokenInfo) {
      disperseToken(tokenInfo.address, recipients);
    }
  };

  // Function to handle the token approval
  const handleApprove = () => {
    if (tokenInfo) {
      approveTokens(totalAmount);
    }
  };

  // Check if token approval is needed
  const needsApproval = selectedCurrency === 'TOKEN' && 
    tokenInfo && 
    allowance !== undefined && 
    allowance !== null &&
    BigInt(allowance.toString()) < totalAmount ? true : false;

  // Loading state
  const isLoading = isDisperseEtherLoading || 
    isDisperseTokenLoading || 
    isApproveLoading;

  // Success state
  const isSuccess = isDisperseEtherSuccess || 
    isDisperseTokenSuccess || 
    isApproveSuccess;

  // Error handling
  const error = disperseEtherError || 
    disperseTokenError || 
    approveError;

  return (
    <div>
      <h2>transaction summary</h2>
      
      <div className="row">
        <span className="accent">currency:</span>
        <span>{currencyText}</span>
      </div>
      
      <div className="row">
        <span className="accent">recipients:</span>
        <span>{recipients.length}</span>
      </div>
      
      <div className="row pb">
        <span className="accent">total amount:</span>
        <span>{formattedAmount} {currencyText}</span>
      </div>
      
      {needsApproval ? (
        <button 
          className="btn-primary"
          onClick={handleApprove}
          disabled={isLoading || isSuccess}
        >
          {isApproveLoading ? 'approving...' : 
           isApproveSuccess ? 'approved!' : 
           `approve ${formattedAmount} ${tokenInfo?.symbol || 'tokens'}`}
        </button>
      ) : (
        <button 
          className="btn-primary"
          onClick={handleDisperse}
          disabled={isLoading || isSuccess || (selectedCurrency === 'TOKEN' && needsApproval)}
        >
          {isLoading ? 'processing...' : 
           isSuccess ? 'success!' : 
           `disperse ${formattedAmount} ${currencyText}`}
        </button>
      )}
      
      {error && (
        <div className="error">
          error: {error.message || String(error)}
        </div>
      )}
      
      {isSuccess && (
        <div className="success">
          transaction successful!
        </div>
      )}
    </div>
  );
};

export default TransactionButton;