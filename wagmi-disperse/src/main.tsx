import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./css/normalize.css";
import "./css/tufte.css";
import "./css/disperse.css";

// Add Buffer to globalThis with proper type declaration
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
  interface globalThis {
    Buffer: typeof Buffer;
  }
}

// Now we can set Buffer on globalThis
(globalThis as any).Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
