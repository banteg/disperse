import { fallback } from "viem";
import * as chains from "viem/chains";
import type { Chain } from "viem/chains";
import { http, createConfig } from "wagmi";
import { coinbaseWallet, injected, metaMask, walletConnect } from "wagmi/connectors";
import { isValidChain } from "./utils/typeGuards";

const allChains = Object.values(chains).filter(isValidChain);

// Ensure we have at least one chain for the type system
const validChains =
  allChains.length > 0 ? (allChains as unknown as [Chain, ...Chain[]]) : ([chains.mainnet] as [Chain, ...Chain[]]);

const MAINNET_RPCS = [
  "https://ethereum-rpc.publicnode.com",
  "https://eth.llamarpc.com",
  "https://1rpc.io/eth",
  "https://eth.drpc.org",
];

export const config = createConfig({
  chains: validChains,
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID || "YOUR_PROJECT_ID" }),
  ],
  transports: Object.fromEntries(
    validChains.map((chain) => [chain.id, chain.id === 1 ? fallback(MAINNET_RPCS.map((url) => http(url))) : http()]),
  ),
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
