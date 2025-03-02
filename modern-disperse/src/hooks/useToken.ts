import { useState } from 'react';
import { 
  useContractRead, 
  useContractWrite, 
  usePrepareContractWrite,
  useAccount
} from 'wagmi';
import { ERC20ABI } from '../contracts/ERC20ABI';
import { DISPERSE_CONTRACT_ADDRESS } from '../contracts/contractAddresses';
import { isAddress } from 'viem';
import { useNetwork } from 'wagmi';

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: bigint;
}

export function useToken() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disperseContractAddress = chain?.id
    ? DISPERSE_CONTRACT_ADDRESS[chain.id]
    : undefined;

  // Read token name
  const { data: tokenName } = useContractRead({
    address: isAddress(tokenAddress) ? tokenAddress as `0x${string}` : undefined,
    abi: ERC20ABI,
    functionName: 'name',
    enabled: Boolean(tokenAddress && isAddress(tokenAddress))
  });

  // Read token symbol
  const { data: tokenSymbol } = useContractRead({
    address: isAddress(tokenAddress) ? tokenAddress as `0x${string}` : undefined,
    abi: ERC20ABI,
    functionName: 'symbol',
    enabled: Boolean(tokenAddress && isAddress(tokenAddress))
  });

  // Read token decimals
  const { data: tokenDecimals } = useContractRead({
    address: isAddress(tokenAddress) ? tokenAddress as `0x${string}` : undefined,
    abi: ERC20ABI,
    functionName: 'decimals',
    enabled: Boolean(tokenAddress && isAddress(tokenAddress))
  });

  // Read token balance
  const { data: tokenBalance } = useContractRead({
    address: isAddress(tokenAddress) ? tokenAddress as `0x${string}` : undefined,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: Boolean(tokenAddress && isAddress(tokenAddress) && address)
  });

  // Read allowance
  const { data: allowance } = useContractRead({
    address: isAddress(tokenAddress) ? tokenAddress as `0x${string}` : undefined,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: address && disperseContractAddress ? [address, disperseContractAddress] : undefined,
    enabled: Boolean(tokenAddress && isAddress(tokenAddress) && address && disperseContractAddress),
    watch: true
  });

  // Prepare approve transaction
  const { config: approveConfig } = usePrepareContractWrite({
    address: isAddress(tokenAddress) ? tokenAddress as `0x${string}` : undefined,
    abi: ERC20ABI,
    functionName: 'approve',
    enabled: Boolean(tokenAddress && isAddress(tokenAddress) && address && disperseContractAddress)
  });

  // Execute approve transaction
  const { 
    write: approve, 
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    error: approveError
  } = useContractWrite(approveConfig);

  // Function to approve tokens
  const approveTokens = (amount: bigint) => {
    if (!disperseContractAddress || !tokenAddress || !isAddress(tokenAddress)) return;
    
    approve?.({
      args: [disperseContractAddress, amount]
    });
  };

  // Function to load token information
  const loadToken = async (address: string) => {
    if (!address || !isAddress(address)) {
      setError("Invalid token address");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTokenAddress(address);

    try {
      // The token data will be fetched by the useContractRead hooks above
      // We'll wait for a few seconds to ensure the data is loaded
      setTimeout(() => {
        if (tokenName && tokenSymbol && tokenDecimals !== undefined && tokenBalance !== undefined) {
          setTokenInfo({
            address,
            name: tokenName as string,
            symbol: tokenSymbol as string,
            decimals: Number(tokenDecimals),
            balance: tokenBalance as bigint
          });
        } else {
          setError("Failed to load token information");
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError("Error loading token: " + (err instanceof Error ? err.message : String(err)));
      setIsLoading(false);
    }
  };

  return {
    tokenAddress,
    tokenInfo,
    isLoading,
    error,
    loadToken,
    allowance,
    approveTokens,
    isApproveLoading,
    isApproveSuccess,
    approveError
  };
}