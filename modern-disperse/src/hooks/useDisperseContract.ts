import { 
  useWriteContract,
  useSimulateContract,
  useContractRead,
  useAccount,
  useChains
} from 'wagmi';
import { DisperseABI } from '../contracts/DisperseABI';
import { DISPERSE_CONTRACT_ADDRESS } from '../contracts/contractAddresses';
import { parseEther } from 'viem';
import { ParsedRecipient } from '../utils/parseInput';

export function useDisperseContract() {
  const { address } = useAccount();
  const chains = useChains();
  const chain = chains?.[0];
  
  const contractAddress = chain?.id 
    ? DISPERSE_CONTRACT_ADDRESS[chain.id] as `0x${string}`
    : undefined;

  const {
    data: disperseEtherSimulation,
    error: disperseEtherPrepareError
  } = useSimulateContract({
    address: contractAddress,
    abi: DisperseABI,
    functionName: 'disperseEther',
    query: {
      enabled: Boolean(contractAddress && address)
    }
  });

  const {
    data: disperseTokenSimulation,
    error: disperseTokenPrepareError
  } = useSimulateContract({
    address: contractAddress,
    abi: DisperseABI,
    functionName: 'disperseToken',
    query: {
      enabled: Boolean(contractAddress && address)
    }
  });

  const {
    writeContract: disperseEther,
    isPending: isDisperseEtherLoading,
    isSuccess: isDisperseEtherSuccess,
    error: disperseEtherError
  } = useWriteContract();

  const {
    writeContract: disperseToken,
    isPending: isDisperseTokenLoading,
    isSuccess: isDisperseTokenSuccess,
    error: disperseTokenError
  } = useWriteContract();

  // Function to disperse Ether
  const disperseEtherFunction = (recipients: ParsedRecipient[], totalAmount: bigint) => {
    if (!contractAddress || !address) return;
    
    // Extract addresses and values arrays
    const addresses = recipients.map(r => r.address as `0x${string}`);
    const values = recipients.map(r => r.amount);
    
    disperseEther({
      address: contractAddress,
      abi: DisperseABI,
      functionName: 'disperseEther',
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
    const addresses = recipients.map(r => r.address as `0x${string}`);
    const values = recipients.map(r => r.amount);
    
    disperseToken({
      address: contractAddress,
      abi: DisperseABI,
      functionName: 'disperseToken',
      args: [tokenAddress as `0x${string}`, addresses, values]
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