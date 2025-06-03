import { useReadContract } from "wagmi";
import { erc20 } from "../contracts";

interface UseTokenAllowanceProps {
  tokenAddress?: `0x${string}`;
  account?: `0x${string}`;
  spender?: `0x${string}`;
  chainId?: number;
}

export function useTokenAllowance({ tokenAddress, account, spender, chainId }: UseTokenAllowanceProps) {
  const { data: allowance, refetch } = useReadContract({
    address: tokenAddress,
    abi: erc20.abi,
    functionName: "allowance",
    args: account && spender ? [account, spender] : undefined,
    chainId,
    query: {
      enabled: !!tokenAddress && !!account && !!spender && !!chainId,
    },
  });

  return {
    allowance: allowance as bigint | undefined,
    refetch,
  };
}