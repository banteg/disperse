import { useAccount, useChainId, useReadContract } from "wagmi";
import { erc20 } from "../contracts";
import { useAppStore } from "../store/appStore";

export function useTokenAllowance() {
  const chainId = useChainId();
  const { address: account } = useAccount();
  const tokenAddress = useAppStore((state) => state.token?.address);
  const spender = useAppStore((state) => state.verifiedAddress?.address);

  const { data: allowance, refetch } = useReadContract({
    address: tokenAddress,
    abi: erc20.abi,
    functionName: "allowance",
    args: account && spender ? [account, spender] : undefined,
    chainId,
    query: {
      enabled: !!tokenAddress && !!account && !!spender && !!chainId,
      // Add a short refetch interval to keep allowance somewhat up-to-date
      // This is useful if the user approves in a separate tab or if allowance changes.
      // Consider making this configurable or event-driven for production.
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  return {
    allowance: allowance as bigint | undefined,
    refetch,
  };
}
