import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../wagmi";

// Create a test-specific query client
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

interface AllTheProvidersProps {
  children: ReactNode;
}

// Provider wrapper for tests
function AllTheProviders({ children }: AllTheProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

// Custom render function that includes providers
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from testing library
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// Mock data helpers
export const mockAddress = "0x0000000000000000000000000000000000000001" as `0x${string}`;
export const mockToken = {
  address: "0x0000000000000000000000000000000000000002" as `0x${string}`,
  symbol: "TEST",
  decimals: 18,
  balance: 1000000000000000000n, // 1 token
};

export const mockRecipients = [
  {
    address: "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182" as `0x${string}`,
    value: 3141592000000000000n, // 3.141592 tokens
  },
  {
    address: "0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a" as `0x${string}`,
    value: 2718200000000000000n, // 2.7182 tokens
  },
];
