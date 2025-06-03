import { http, createConfig } from "wagmi";
import * as chains from "wagmi/chains";
import { coinbaseWallet, injected, metaMask, walletConnect } from "wagmi/connectors";

const allChains = Object.values(chains).filter(
  (chain): chain is typeof chains.mainnet => typeof chain === "object" && chain !== null && "id" in chain,
);

export const config = createConfig({
  // @ts-ignore
  chains: allChains,
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID || "YOUR_PROJECT_ID" }),
  ],
  transports: Object.fromEntries(allChains.map((chain) => [chain.id, http()])),
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
