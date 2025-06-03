import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { mainnet } from "wagmi/chains";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY || "YOUR_API_KEY",
      chainId: mainnet.id,
      contracts: [
        {
          name: "Disperse",
          address: {
            [mainnet.id]: "0xD152f549545093347A162Dce210e7293f1452150",
          },
        },
        {
          name: "CreateX",
          address: {
            [mainnet.id]: "0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed",
          },
        },
      ],
    }),
    react(),
  ],
});
