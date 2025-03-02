import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, optimism, polygon, arbitrum, base, filecoin } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';

// Create wagmi config with custom RPC endpoints if available
const config = createConfig({
  chains: [mainnet, optimism, polygon, arbitrum, base, filecoin],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_RPC),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC),
    [filecoin.id]: http(),
  },
});

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Component {...pageProps} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}