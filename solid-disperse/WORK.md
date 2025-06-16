### **Production-Ready Plan for Disperse App (SolidJS)**

#### **Phase 1: Foundational Code Health & Correctness**

This phase addresses critical bugs and code structure issues. These are non-negotiable before launch.

**1. Fix BigInt Floating Point Inaccuracy (Critical Bug)**

- **Problem:** In `App.tsx`, you are converting `BigInt` values to `Number` for display, which can lead to precision loss and incorrect balances being shown to the user. This is a critical bug for a financial application.
  ```tsx
  // Problematic code
  (Number(balanceData()!.value) / 1e18).toFixed(6);
  ```
- **Action Plan:**
  1.  Remove all instances of `Number(bigintValue)`.
  2.  Use `viem`'s `formatUnits` utility for all user-facing balance displays. It is designed to handle `BigInt` safely.
  3.  Update `App.tsx` and any other components to use this utility for consistency and correctness.

**2. Refactor the Monolithic `utils.ts` File**

- **Problem:** The current `utils.ts` combines responsibilities for balance calculations, contract verification, recipient parsing, and error handling. This is a code smell that reduces maintainability and was solved in the React version.
- **Action Plan:**
  1.  Create a `src/utils` directory if it doesn't exist.
  2.  Split `utils.ts` into the following files, mirroring the clean structure of the React version:
      - `src/utils/balanceCalculations.ts`
      - `src/utils/contractVerify.ts`
      - `src/utils/parseRecipients.ts`
      - `src/utils/errors.ts`
  3.  Update all imports across the application to point to the new, modularized utility files.

**3. Replace Custom `ErrorBoundary` with Solid's Primitive**

- **Problem:** You've implemented a class-based `ErrorBoundary`. While functional, SolidJS provides a native `<ErrorBoundary>` component that is more idiomatic, guaranteed to be compatible with Solid's rendering lifecycle, and requires less boilerplate.
- **Action Plan:**
  1.  Delete `src/components/ErrorBoundary.tsx`.
  2.  In `src/index.tsx`, import `ErrorBoundary` from `"solid-js"`.
  3.  Wrap `<App />` with the native `<ErrorBoundary>`, providing a `fallback` prop that renders an error message and a refresh button.

**4. Standardize Chain Definitions**

- **Problem:** `networks.ts` reimplements a hardcoded list of chains. The React version used `wagmi/chains`, which is the canonical, up-to-date source. Your current approach creates maintenance debt.
- **Action Plan:**
  1.  In `wagmi.config.ts`, import chains directly from `viem/chains`.
  2.  Delete your custom `networks.ts` file.
  3.  Create a new, smaller `networks.ts` (or `chain.utils.ts`) that imports the `chains` array from `wagmi.config.ts` and provides only the necessary helper functions (`explorerTx`, `explorerAddr`, `networkName`, etc.) by operating on that array. This ensures you have a single source of truth for chain data.

---

#### **Phase 2: Reliability and User Experience**

This phase focuses on making the application more robust and intuitive for the end-user.

**1. Implement an Explicit State Machine for App Flow**

- **Problem:** The main `App.tsx` component uses a complex web of `<Show>` components based on multiple reactive signals (`isConnected`, `isChainSupported`, `isContractLoading`). This is brittle and can lead to invalid or confusing UI states. The original Riot app had a clear, albeit simple, state enum.
- **Action Plan:**
  1.  Define a state enum similar to the React version (`WALLET_REQUIRED`, `NETWORK_UNSUPPORTED`, `AWAITING_INPUT`, etc.).
  2.  Create a master `appState` signal in `App.tsx`.
  3.  Use a `createEffect` to derive the `appState` from the various web3 signals (`isConnected`, `chainId`, `isContractDeployed`).
  4.  Refactor the `App.tsx` render logic to use a `<Switch>` on the `appState` signal. This will make the UI flow explicit, predictable, and easier to debug.

**2. Improve Transaction State Feedback**

- **Problem:** `TransactionButton.tsx` manually reimplements state tracking (`isPending`, `isConfirming`) that `@wagmi/core` can provide more robustly. The current implementation is good but can be simplified and made more reliable by leaning on the underlying library.
- **Action Plan:**
  1.  Refactor `TransactionButton.tsx`. Instead of calling `writeContract` and `waitForTransactionReceipt` as standalone functions, create reactive primitives around them.
  2.  You can create a custom hook like `useWagmiWrite` that wraps `writeContract` and returns signals for `isPending`, `isSuccess`, `error`, and `data`.
  3.  This makes the component's state derived directly from wagmi's core logic, reducing the chance of state mismatches.
  4.  Ensure that `onSuccess` callbacks correctly trigger refetches of data (like allowance or balances) to keep the UI in sync. The `useTokenAllowance` hook already has a `refetch` trigger which is good; ensure it's called.

**3. Use `getEnsName` for ENS Resolution**

- **Problem:** `Header.tsx` uses `readContract` to resolve ENS names. `@wagmi/core` provides a dedicated `getEnsName` function that includes optimizations like caching and multicall support (via batching).
- **Action Plan:**
  1.  In `Header.tsx`, replace the `readContract` call inside `createResource` with `getEnsName(config, { address, chainId: 1 })`. This is simpler and more efficient.

---

#### **Phase 3: Production Polish & Deployment**

This phase covers the final steps before the application can be considered truly production-ready.

**1. Implement Analytics and Error Monitoring**

- **Problem:** The app has no observability. If users encounter issues in production, you have no way of knowing what went wrong.
- **Action Plan:**
  1.  Integrate a service like Sentry or LogRocket.
  2.  Configure Sentry to capture errors from the SolidJS `ErrorBoundary`.
  3.  Add context to error reports, such as the current `chainId`, user's address (anonymized if needed), and app state.
  4.  Add basic event tracking (e.g., `transaction_submitted`, `token_loaded`) to understand user flows.

**2. Finalize Build & Environment Configuration**

- **Problem:** The WalletConnect `projectId` is likely missing or hardcoded. Secrets and environment-specific configs need a proper home.
- **Action Plan:**
  1.  Create a `.env` file for local development and a `.env.production` file.
  2.  Ensure `VITE_WC_PROJECT_ID` and any other future keys (like a Sentry DSN) are managed here.
  3.  Add `.env.local` and similar files to `.gitignore`.
  4.  Document the required environment variables in a `.env.example` file.

**3. Conduct Comprehensive E2E Testing**

- **Problem:** While there are some utilities, there's no evidence of a full end-to-end testing suite.
- **Action Plan:**
  1.  Using a framework like Playwright or Cypress, write E2E tests for the core user journeys on a testnet (e.g., Sepolia):
      - Connect wallet.
      - Load and send ETH.
      - Switch to token, load a token.
      - Approve the token.
      - Send the token.
      - Handle transaction rejection.
      - Handle insufficient balance errors.
  2.  Run these tests as a pre-deployment check.

By executing this plan, you will transform the current SolidJS prototype into a robust, reliable, and maintainable production application.
