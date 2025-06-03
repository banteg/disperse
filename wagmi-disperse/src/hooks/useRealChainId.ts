import { useEffect, useState } from "react";
import { useChainId } from "wagmi";
import type { WindowWithEthereum } from "../types";

export function useRealChainId() {
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const wagmiChainId = useChainId();

  useEffect(() => {
    if (wagmiChainId) {
      setChainId(wagmiChainId);
    }

    const handleChainChanged = (data: unknown) => {
      const chainIdHex = data as string;
      const newChainId = Number.parseInt(chainIdHex, 16);
      console.log(`Ethereum provider detected chain change to: ${newChainId} (from hex ${chainIdHex})`);
      setChainId(newChainId);
    };

    const ethereum = (window as WindowWithEthereum).ethereum;
    if (ethereum) {
      try {
        ethereum
          .request({ method: "eth_chainId" })
          .then((chainIdHex: unknown) => {
            const id = Number.parseInt(chainIdHex as string, 16);
            console.log(`Initial ethereum chainId: ${id} (from hex ${chainIdHex})`);
            setChainId(id);
          })
          .catch((err: unknown) => console.error("Error getting chainId:", err));

        ethereum.on?.("chainChanged", handleChainChanged);

        return () => {
          ethereum.removeListener?.("chainChanged", handleChainChanged);
        };
      } catch (err) {
        console.error("Error accessing ethereum provider:", err);
      }
    }
  }, [wagmiChainId]);

  return chainId;
}
