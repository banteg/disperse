import { http, createConfig } from "wagmi";
import * as chains from "wagmi/chains";
import type { Chain } from "wagmi/chains";
import { coinbaseWallet, injected, metaMask, walletConnect } from "wagmi/connectors";
import { isValidChain } from "./utils/typeGuards";

const allChains = Object.values(chains).filter(isValidChain);

// Ensure we have at least one chain for the type system
const validChains =
  allChains.length > 0 ? (allChains as unknown as [Chain, ...Chain[]]) : ([chains.mainnet] as [Chain, ...Chain[]]);

export const config = createConfig({
  chains: validChains,
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID || "YOUR_PROJECT_ID" }),
  ],
  transports: Object.fromEntries(validChains.map((chain) => [chain.id, http()])),
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
