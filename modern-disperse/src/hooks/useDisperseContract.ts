import { 
  useContractWrite, 
  useContractRead,
  usePrepareContractWrite,
  useAccount,
  useNetwork
} from 'wagmi';
import { DisperseABI } from '../contracts/DisperseABI';
import { DISPERSE_CONTRACT_ADDRESS } from '../contracts/contractAddresses';
import { parseEther } from 'viem';
import { ParsedRecipient } from '../utils/parseInput';

export function useDisperseContract() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  
  const contractAddress = chain?.id 
    ? DISPERSE_CONTRACT_ADDRESS[chain.id] 
    : undefined;

  const {
    config: disperseEtherConfig,
    error: disperseEtherPrepareError
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: DisperseABI,
    functionName: 'disperseEther',
    enabled: Boolean(contractAddress && address)
  });

  const {
    config: disperseTokenConfig,
    error: disperseTokenPrepareError
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: DisperseABI,
    functionName: 'disperseToken',
    enabled: Boolean(contractAddress && address)
  });

  const {
    write: disperseEther,
    isLoading: isDisperseEtherLoading,
    isSuccess: isDisperseEtherSuccess,
    error: disperseEtherError
  } = useContractWrite(disperseEtherConfig);

  const {
    write: disperseToken,
    isLoading: isDisperseTokenLoading,
    isSuccess: isDisperseTokenSuccess,
    error: disperseTokenError
  } = useContractWrite(disperseTokenConfig);

  // Function to disperse Ether
  const disperseEtherFunction = (recipients: ParsedRecipient[], totalAmount: bigint) => {
    if (!contractAddress || !address) return;
    
    // Extract addresses and values arrays
    const addresses = recipients.map(r => r.address);
    const values = recipients.map(r => r.amount);
    
    disperseEther?.({
      args: [addresses, values],
      value: totalAmount
    });
  };

  // Function to disperse Tokens
  const disperseTokenFunction = (
    tokenAddress: string,
    recipients: ParsedRecipient[]
  ) => {
    if (!contractAddress || !address) return;
    
    // Extract addresses and values arrays
    const addresses = recipients.map(r => r.address);
    const values = recipients.map(r => r.amount);
    
    disperseToken?.({
      args: [tokenAddress, addresses, values]
    });
  };

  return {
    contractAddress,
    disperseEther: disperseEtherFunction,
    disperseToken: disperseTokenFunction,
    isDisperseEtherLoading,
    isDisperseTokenLoading,
    isDisperseEtherSuccess,
    isDisperseTokenSuccess,
    disperseEtherError,
    disperseTokenError
  };
}