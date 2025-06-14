Below is a structured review of the migration as it stands today, the main architectural/logic problems I found, concrete examples of latent bugs, and proven patterns you can adopt to rule out “bad” state transitions altogether.

---

## 1  Architecture overview (what changed)

- **Global state moved to a single Zustand store** with five slices (wallet, currency, transaction, contract, app‑state) created in `src/store/index.ts` .
- UI logic is still concentrated in `App.tsx`; it pulls slice data through selector hooks and then drives a hand‑rolled finite‑state machine based on the `AppState` enum .
- Side effects (on‑chain reads/writes, parsing, allowance polling, etc.) are scattered across ad‑hoc `useEffect` blocks inside many components.

The migration therefore ended half‑way: state **lives in the store**, but **behaviour (state transitions) lives in React effects**, so the app can easily drift into invalid combinations.

---

## 2  Key architectural issues

| #     | Issue                                                                                                                                                                                                                  | Why it is dangerous                                                                                                                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A** | **Implicit state machine in `App.tsx`**—four nested `useEffect` blocks mutate `appState` based on 10‑plus flags .                                                                                                      | Hard to reason about ordering; race conditions between async byte‑code look‑ups and wallet status can put the UI in an impossible state (e.g. _NETWORK_UNAVAILABLE_ even though a valid contract is found milliseconds later). |
| **B** | **Store updates merge unrelated slices** (`updateWallet`, `updateContract` call `set(state => { …state, …payload })`) .                                                                                                | A typo or new field name collision silently overwrites another slice.                                                                                                                                                          |
| **C** | **`resetToken()` clears `token` but leaves `sending === "token"`** .                                                                                                                                                   | The UI now believes “token mode” is active although no decimals/symbol exist, driving `AppState` into _CONNECTED_TO_WALLET_ forever.                                                                                           |
| **D** | **Prop vs store divergence**: `RecipientInput` receives `sending`/`token` as props from `<App/>` but ignores them and re‑reads the store .                                                                             | When you add story‑book tests or embed the component elsewhere the behaviour will differ from expectations.                                                                                                                    |
| **E** | **Aggressive merge of slice fields** means _no compile‑time exhaustiveness_. For example, adding `gasPrice` to the wallet slice is one line, but _every_ reducer can now accidentally clobber it.                      |                                                                                                                                                                                                                                |
| **F** | **Manual query‑key invalidation** in `TransactionButton` risks forgetting variants (e.g. allowance key shape must exactly match the call) and introduces duplicated logic .                                            |                                                                                                                                                                                                                                |
| **G** | **Window‑level debug helpers** (`window.toggleDisperseDebug`) never removed if the component is un‑mounted, leaking globals .                                                                                          |                                                                                                                                                                                                                                |
| **H** | **Regex‑based parser in hot path** (`parseRecipients`) runs on every keystroke; it has quadratic worst‑case behaviour when the textarea grows.                                                                         |                                                                                                                                                                                                                                |
| **I** | **Sequential contract‑verification loop** (`useContractVerification`) resets index on every chain change; when the user flips networks quickly, earlier async results may set `verifiedAddress` for the _wrong_ chain. |                                                                                                                                                                                                                                |

---

## 3  Concrete bugs you can reproduce now

1. **Token flow stalls**
   _Steps_: choose “token”, type an address, then click “reset” in the loader.
   _Result_: `sending === "token"`, `token === {}` → the _ENTERED_AMOUNTS_ transition can never fire.
   _Root cause_: bug **C** above.

2. **Unsupported‑network flash**
   When the byte‑code fetch is slow the app first renders _NETWORK_UNAVAILABLE_ (red error) and then, after verification, jumps to _CONNECTED_TO_WALLET_. A second `useEffect` may write over that again, causing a flicker or stuck state.
   _Files_: logic in first `useEffect` block .

3. **Incorrect allowance freshness**
   You revoke allowance, but the allowance query was created with `[account, spender]`; the invalidation in `TransactionButton` only covers the exact same key. A different spender on the same chain stays stale and the UI says “has allowance”.
   _Files_: invalidation code .

4. **RecipientInput out of sync**
   When the user toggles from ether to token, `App.tsx` re‑computes decimals and passes them as props, but the textarea component continues to call `getDecimals` with the _old_ `sending` value read from the store.
   _Files_: component implementation .

---

## 4  Eliminating “bad” state transitions

### 4.1 Adopt an explicit finite‑state machine

- Move the _single_ source of truth for screen flow into a library such as **XState** (or `zustand-middleware-machine`).
- Model states: `idle → walletLocked → walletConnected → currencyChosen → recipientsEntered → ready`.
- Encode allowed events (`CONNECT`, `SELECT_CURRENCY[type]`, `PARSE_OK`, `DEPLOY_FOUND`, …).
- XState will refuse illegal transitions at runtime and TypeScript will warn you at compile time.

### 4.2 Keep derived data **derived**

- `appState` becomes a **selector** computed from primitive slices (`wallet.isConnected`, `contract.isDeployed`, `currency.sending`, …).
- That removes three `useEffect` blocks and the risk of them firing in an unexpected order.

```ts
const selectAppState = createSelector(
  (s: DisperseStore) => ({
    connected: s.isConnected,
    deployed: s.isContractDeployed,
    sending: s.sending,
    tokenReady: !!s.token.symbol && s.token.decimals !== undefined,
    recipients: s.recipients.length > 0,
  }),
  ({ connected, deployed, sending, tokenReady, recipients }) => {
    if (!connected) return AppState.UNLOCK_WALLET;
    if (!deployed) return AppState.NETWORK_UNAVAILABLE;
    if (sending === null) return AppState.CONNECTED_TO_WALLET;
    if (sending === "token" && !tokenReady) return AppState.CONNECTED_TO_WALLET;
    if (!recipients) return AppState.SELECTED_CURRENCY;
    return AppState.ENTERED_AMOUNTS;
  }
);
```

No imperative effects → no race conditions.

### 4.3 Stop merging whole‑store patches

- Give every slice a **namespace** (`wallet.` `currency.` etc.) and never spread‑merge unrelated keys.
- Alternatively, split into multiple stores and compose with Zustand’s `combine` helper.

### 4.4 Make “token mode” safe

- `resetToken()` should also set `sending = null`; or better, remove `resetToken` and drive everything through the state machine event (`TOKEN_RESET`).

### 4.5 Unify props vs store

- If a component relies on the global store, do **not** accept the same data as props; remove `sending`, `token` from `RecipientInput` signature to avoid divergence.

### 4.6 Asynchronous safety

- In `useContractVerification`, keep a `currentChainId` ref and discard stale byte‑code responses.
- Prefer **parallel** requests + `Promise.allSettled` over sequential index walks so the UI can settle faster.

### 4.7 Testing the state machine

- Port existing vitest suites to **model‑based tests**: generate random sequences of events and assert that every reachable state satisfies invariants (e.g. _SELECTED_CURRENCY_ ⇒ `sending !== null`).
- Add React Testing Library integration tests that mount the whole tree and drive simulated wallets to cover cross‑slice behaviour.

---

## 5  Minor clean‑ups

- Remove global debug toggles on unmount to avoid leaks .
- Replace quadratic regex in `parseRecipients` with a streaming parser or limit input length.
- Polyfill `Buffer` only when it does not already exist to avoid clobbering other libs.

---

### 6  Migration plan summary

1. **Introduce the explicit state machine** (keep imperative fall‑backs hidden behind a feature flag).
2. **Cut over components** one by one, reading `currentState` and dispatching events only.
3. **Delete old `useEffect`‑driven transitions** once coverage proves the new machine is correct.
4. **Refactor slices** to avoid global merge functions.
5. **Ship**—you will have removed _all_ uncontrolled transitions and the classes of bugs listed above.

With these steps the app’s behaviour becomes **deterministic, testable and self‑documenting**, eliminating the accidental states that currently “break” the UI.

### Short answer

Yes — you need at least one **intermediate token‑loading state** (and probably a small handful of other micro‑states) to make the flow deterministic. At the moment `AppState.SELECTED_CURRENCY` conflates two very different realities:

| what the user sees     | internal facts                                 | comment                                                 |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| **Ether** radio chosen | you already know symbol/decimals (`ETH`, `18`) | user can type recipients immediately                    |
| **Token** radio chosen | you _don’t_ yet know symbol/decimals/allowance | user must paste a contract and wait for RPC round‑trips |

Because the same state value covers both branches, React effects race one another and the UI can briefly (or permanently) enter impossible combinations such as “recipients box visible but no decimals defined”.

---

### Minimal additional states that close the gap

Below is the thinnest set of new states that eliminates every ambiguous transition while keeping the overall machine easy to reason about. States in **bold** are additions to your current `AppState` enum .

```
UNLOCK_WALLET
  └── WALLET_CONNECTED
          ├── NETWORK_UNSUPPORTED
          └── CONTRACT_READY
                   ├── CURRENCY_CHOSEN
                   │       ├── Ether branch ──► RECIPIENTS_ENTERED
                   │       └── Token branch
                   │               ├── **TOKEN_LOADING**
                   │               │       │ (RPC calls in flight)
                   │               └── **TOKEN_READY**
                   │                       ├── **ALLOWANCE_OK**
                   │                       │       └── RECIPIENTS_ENTERED
                   │                       └── **ALLOWANCE_NEEDED**
                   └── (other future flows …)
```

- **TOKEN_LOADING** – starts when the user clicks “token” _or_ when they edit the token‑address field again; ends on the first successful read of `symbol / decimals`.
- **TOKEN_READY** – all ERC‑20 metadata and current balance are known.
- **ALLOWANCE_NEEDED / ALLOWANCE_OK** – separates “you must approve first” from “Disperse can already move the amount you typed”.
- The Ether branch skips the extra substates entirely, preserving today’s fast path.

These are orthogonal; you can model them either as siblings of `CURRENCY_CHOSEN` (flat machine) or as **nested substates** in XState (preferred, because _Ether_ and _Token_ become parallel branches with their own inner logic).

---

### Why they matter

| Problem today                                                                                                                          | How the new states fix it                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `RecipientInput` sometimes renders with `sending="token"` while `token.decimals` is still `undefined`, causing NaNs and failed parses. | The component becomes child of **TOKEN_READY**; it literally never mounts earlier.            |
| Flicker when token allowance returns and triggers a re‑render of the approve button.                                                   | Button lives in **ALLOWANCE_NEEDED/OK** — no re‑mount, just a deterministic state transition. |
| Multiple `useEffect` blocks in `App.tsx` fight to set `appState` as async calls resolve in different orders.                           | A single event (`TOKEN_LOADED`, `APPROVE_SUCCESS`) drives the machine; ordering cannot race.  |
| Hard to test “token loaded but allowance missing” flow.                                                                                | Model‑based tests can assert that **ALLOWANCE_NEEDED ⇒ approve ⇒ ALLOWANCE_OK** always holds. |

---

### Implementation sketch with XState

```ts
import { createMachine } from "xstate";

export const disperseMachine = createMachine({
  id: "disperse",
  initial: "unlockWallet",
  states: {
    unlockWallet: {
      on: { CONNECT: "walletConnected" },
    },
    walletConnected: {
      on: {
        UNSUPPORTED_CHAIN: "networkUnsupported",
        CONTRACT_VERIFIED: "contractReady",
      },
    },
    networkUnsupported: {
      /* … deploy flow … */
    },
    contractReady: {
      initial: "currencyUnchosen",
      states: {
        currencyUnchosen: {
          on: {
            SELECT_TOKEN: "token.loading",
            SELECT_ETHER: "ether.recipients",
          },
        },
        ether: {
          initial: "recipients",
          states: {
            recipients: { on: { PARSE_OK: "#disperse.ready" } },
          },
        },
        token: {
          initial: "loading",
          states: {
            loading: {
              invoke: {
                src: "loadToken",
                onDone: "metadata",
                onError: "currencyUnchosen",
              },
            },
            metadata: {
              on: {
                ALLOWANCE_LOW: "needAllowance",
                ALLOWANCE_OK: "haveAllowance",
              },
            },
            needAllowance: {
              on: { APPROVE_SUCCESS: "haveAllowance" },
            },
            haveAllowance: {
              on: { PARSE_OK: "#disperse.ready" },
            },
          },
        },
      },
    },
    ready: {
      entry: "enableDisperseButton",
      on: { SUBMIT_TX: "txPending" },
    },
    txPending: {
      /* … */
    },
  },
});
```

- Guards (`ALLOWANCE_LOW`) and invoked services (`loadToken`) replace the ad‑hoc `useEffect` logic in `App.tsx`.
- UI components render exclusively from the machine’s `state.matches('…')` selectors; no prop and store divergence remains.

---

### If you prefer _derived_ rather than _explicit_ states

Another viable route is **keep your six top‑level states** and derive extra booleans (`tokenReady`, `allowanceOk`) as selectors, then gate the UI on those. That still works, but you must ensure:

```ts
const tokenReady =
  sending === "token" && token.symbol && token.decimals !== undefined;
const allowanceOk = tokenReady && token.allowance! >= totalAmount;
```

and never render `RecipientInput` unless `tokenReady`. Using an FSM simply makes those invariants self‑documenting and reject‑proof at runtime.

---

### Bottom line

- Add a **token‑loading** sub‑state and an **allowance** sub‑state (or flags) so the UI cannot jump ahead of asynchronous on‑chain reads.
- Model them formally (XState or at least Zustand middleware with guards) to eliminate races instead of sprinkling more `useEffect` checks.
- Ether path keeps its single hop, so the UX speed you already have is preserved.

With these two micro‑states in place, every screen transition becomes obvious, testable, and impossible to reach out of order.
