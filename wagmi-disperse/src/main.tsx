import { Buffer as BufferPolyfill } from "buffer";
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
  var Buffer: typeof BufferPolyfill;
}

// Now we can set Buffer on globalThis
globalThis.Buffer = BufferPolyfill;

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
