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
    ? 'ETH'
    : tokenInfo ? tokenInfo.symbol : 'tokens';

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
    BigInt(allowance.toString()) < totalAmount;

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
    <div className="my-6">
      <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Transaction Summary</h2>
        
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-gray-600 dark:text-gray-400">Currency:</div>
            <div>{currencyText}</div>
            
            <div className="text-gray-600 dark:text-gray-400">Recipients:</div>
            <div>{recipients.length}</div>
            
            <div className="text-gray-600 dark:text-gray-400">Total Amount:</div>
            <div>{formattedAmount} {currencyText}</div>
          </div>
        </div>
        
        {needsApproval ? (
          <button 
            className="btn-primary w-full"
            onClick={handleApprove}
            disabled={isLoading || isSuccess}
          >
            {isApproveLoading ? 'Approving...' : 
             isApproveSuccess ? 'Approved!' : 
             `Approve ${formattedAmount} ${tokenInfo?.symbol || 'tokens'}`}
          </button>
        ) : (
          <button 
            className="btn-primary w-full"
            onClick={handleDisperse}
            disabled={isLoading || isSuccess || (selectedCurrency === 'TOKEN' && needsApproval)}
          >
            {isLoading ? 'Processing...' : 
             isSuccess ? 'Success!' : 
             `Disperse ${formattedAmount} ${currencyText}`}
          </button>
        )}
        
        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm dark:bg-red-900 dark:border-red-700 dark:text-red-100">
            Error: {error.message || String(error)}
          </div>
        )}
        
        {isSuccess && (
          <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm dark:bg-green-900 dark:border-green-700 dark:text-green-100">
            Transaction successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionButton;