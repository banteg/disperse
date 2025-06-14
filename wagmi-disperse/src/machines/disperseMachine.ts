import { createMachine, assign } from "xstate";
import type { TokenInfo } from "../types";

// Machine context type
export interface DisperseContext {
  isConnected: boolean;
  isChainSupported: boolean;
  isContractDeployed: boolean;
  isBytecodeLoading: boolean;
  hasContractAddress: boolean;
  sending: "ether" | "token" | null;
  token: TokenInfo;
  recipientsCount: number;
  totalAmount: bigint;
  allowance: bigint;
}

// Machine event types
export type DisperseEvent =
  | { type: "CONNECT" }
  | { type: "DISCONNECT" }
  | { type: "CHAIN_CHANGED"; isSupported: boolean; isDeployed: boolean }
  | { type: "CONTRACT_VERIFIED"; isDeployed: boolean }
  | { type: "CONTRACT_LOADING_STARTED" }
  | { type: "CONTRACT_LOADING_FINISHED"; isDeployed: boolean }
  | { type: "SELECT_ETHER" }
  | { type: "SELECT_TOKEN" }
  | { type: "TOKEN_LOADING" }
  | { type: "TOKEN_LOADED"; token: TokenInfo }
  | { type: "TOKEN_RESET" }
  | { type: "RECIPIENTS_CHANGED"; count: number; totalAmount: bigint }
  | { type: "RECIPIENTS_CLEARED" }
  | { type: "ALLOWANCE_UPDATED"; allowance: bigint }
  | { type: "APPROVE_SUCCESS" }
  | { type: "TRANSACTION_SUBMITTED" }
  | { type: "TRANSACTION_SUCCESS" }
  | { type: "TRANSACTION_ERROR" };

export const disperseMachine = createMachine({
  id: "disperse",
  types: {} as {
    context: DisperseContext;
    events: DisperseEvent;
    input: DisperseContext;
  },
  context: ({ input }) => ({
    isConnected: input?.isConnected || false,
    isChainSupported: input?.isChainSupported || false,
    isContractDeployed: input?.isContractDeployed || false,
    isBytecodeLoading: input?.isBytecodeLoading || false,
    hasContractAddress: input?.hasContractAddress || false,
    sending: input?.sending || null,
    token: input?.token || {},
    recipientsCount: input?.recipientsCount || 0,
    totalAmount: input?.totalAmount || 0n,
    allowance: input?.allowance || 0n,
  }),
  initial: "disconnected",
  states: {
    disconnected: {
      on: {
        CONNECT: {
          target: "connected",
          actions: assign({
            isConnected: true,
          }),
        },
      },
    },
    connected: {
      initial: "checkingNetwork",
      states: {
        checkingNetwork: {
          always: [
            {
              target: "unsupportedNetwork",
              guard: ({ context }) => !context.isChainSupported || !context.isContractDeployed,
            },
            {
              target: "ready",
              guard: ({ context }) => context.isChainSupported && context.isContractDeployed,
            },
          ],
          on: {
            CONTRACT_LOADING_STARTED: {
              actions: assign({
                isBytecodeLoading: true,
              }),
            },
            CONTRACT_LOADING_FINISHED: {
              actions: assign({
                isBytecodeLoading: false,
                isContractDeployed: ({ event }) => event.isDeployed,
              }),
            },
            CONTRACT_VERIFIED: {
              actions: assign({
                isContractDeployed: ({ event }) => event.isDeployed,
              }),
            },
          },
        },
        unsupportedNetwork: {
          on: {
            CHAIN_CHANGED: {
              target: "checkingNetwork",
              actions: assign({
                isChainSupported: ({ event }) => event.isSupported,
                isContractDeployed: ({ event }) => event.isDeployed,
              }),
            },
            CONTRACT_VERIFIED: {
              target: "checkingNetwork",
              actions: assign({
                isContractDeployed: ({ event }) => event.isDeployed,
              }),
            },
          },
        },
        ready: {
          initial: "idle",
          states: {
            idle: {
              on: {
                SELECT_ETHER: {
                  target: "etherSelected",
                  actions: assign({
                    sending: "ether",
                    token: {},
                  }),
                },
                SELECT_TOKEN: {
                  target: "tokenFlow",
                  actions: assign({
                    sending: "token",
                  }),
                },
              },
            },
            etherSelected: {
              initial: "waitingForRecipients",
              states: {
                waitingForRecipients: {
                  on: {
                    RECIPIENTS_CHANGED: {
                      target: "recipientsEntered",
                      guard: ({ event }) => event.count > 0,
                      actions: assign({
                        recipientsCount: ({ event }) => event.count,
                        totalAmount: ({ event }) => event.totalAmount,
                      }),
                    },
                  },
                },
                recipientsEntered: {
                  on: {
                    RECIPIENTS_CHANGED: [
                      {
                        target: "waitingForRecipients",
                        guard: ({ event }) => event.count === 0,
                        actions: assign({
                          recipientsCount: 0,
                          totalAmount: 0n,
                        }),
                      },
                      {
                        actions: assign({
                          recipientsCount: ({ event }) => event.count,
                          totalAmount: ({ event }) => event.totalAmount,
                        }),
                      },
                    ],
                    RECIPIENTS_CLEARED: {
                      target: "waitingForRecipients",
                      actions: assign({
                        recipientsCount: 0,
                        totalAmount: 0n,
                      }),
                    },
                    TRANSACTION_SUBMITTED: "transactionPending",
                  },
                },
                transactionPending: {
                  on: {
                    TRANSACTION_SUCCESS: "#disperse.connected.ready.idle",
                    TRANSACTION_ERROR: "recipientsEntered",
                  },
                },
              },
              on: {
                SELECT_TOKEN: {
                  target: "tokenFlow",
                  actions: assign({
                    sending: "token",
                  }),
                },
                SELECT_ETHER: undefined, // Prevent re-entering ether flow
              },
            },
            tokenFlow: {
              initial: "loading",
              states: {
                loading: {
                  on: {
                    TOKEN_LOADED: {
                      target: "checkingAllowance",
                      actions: assign({
                        token: ({ event }) => event.token,
                      }),
                    },
                    TOKEN_RESET: {
                      target: "#disperse.connected.ready.idle",
                      actions: assign({
                        sending: null,
                        token: {},
                      }),
                    },
                  },
                },
                checkingAllowance: {
                  always: [
                    {
                      target: "needsAllowance",
                      guard: ({ context }) => context.totalAmount > context.allowance,
                    },
                    {
                      target: "hasAllowance",
                    },
                  ],
                  on: {
                    ALLOWANCE_UPDATED: {
                      actions: assign({
                        allowance: ({ event }) => event.allowance,
                      }),
                    },
                  },
                },
                needsAllowance: {
                  on: {
                    APPROVE_SUCCESS: "hasAllowance",
                    ALLOWANCE_UPDATED: {
                      target: "checkingAllowance",
                      actions: assign({
                        allowance: ({ event }) => event.allowance,
                      }),
                    },
                    RECIPIENTS_CHANGED: {
                      target: "checkingAllowance",
                      actions: assign({
                        recipientsCount: ({ event }) => event.count,
                        totalAmount: ({ event }) => event.totalAmount,
                      }),
                    },
                  },
                },
                hasAllowance: {
                  initial: "waitingForRecipients",
                  states: {
                    waitingForRecipients: {
                      on: {
                        RECIPIENTS_CHANGED: {
                          target: "recipientsEntered",
                          guard: ({ event }) => event.count > 0,
                          actions: assign({
                            recipientsCount: ({ event }) => event.count,
                            totalAmount: ({ event }) => event.totalAmount,
                          }),
                        },
                      },
                    },
                    recipientsEntered: {
                      on: {
                        RECIPIENTS_CHANGED: [
                          {
                            target: "waitingForRecipients",
                            guard: ({ event }) => event.count === 0,
                            actions: assign({
                              recipientsCount: 0,
                              totalAmount: 0n,
                            }),
                          },
                          {
                            target: "#disperse.connected.ready.tokenFlow.checkingAllowance",
                            guard: ({ context, event }) => event.totalAmount > context.allowance,
                            actions: assign({
                              recipientsCount: ({ event }) => event.count,
                              totalAmount: ({ event }) => event.totalAmount,
                            }),
                          },
                          {
                            actions: assign({
                              recipientsCount: ({ event }) => event.count,
                              totalAmount: ({ event }) => event.totalAmount,
                            }),
                          },
                        ],
                        RECIPIENTS_CLEARED: {
                          target: "waitingForRecipients",
                          actions: assign({
                            recipientsCount: 0,
                            totalAmount: 0n,
                          }),
                        },
                        TRANSACTION_SUBMITTED: "transactionPending",
                      },
                    },
                    transactionPending: {
                      on: {
                        TRANSACTION_SUCCESS: "#disperse.connected.ready.idle",
                        TRANSACTION_ERROR: "recipientsEntered",
                      },
                    },
                  },
                  on: {
                    ALLOWANCE_UPDATED: {
                      target: "checkingAllowance",
                      actions: assign({
                        allowance: ({ event }) => event.allowance,
                      }),
                    },
                  },
                },
              },
              on: {
                TOKEN_RESET: {
                  target: "idle",
                  actions: assign({
                    sending: null,
                    token: {},
                    allowance: 0n,
                  }),
                },
                SELECT_ETHER: {
                  target: "etherSelected",
                  actions: assign({
                    sending: "ether",
                    token: {},
                    allowance: 0n,
                  }),
                },
                SELECT_TOKEN: undefined, // Prevent re-entering token flow
              },
            },
          },
          on: {
            CHAIN_CHANGED: {
              target: "checkingNetwork",
              actions: assign({
                isChainSupported: ({ event }) => event.isSupported,
                isContractDeployed: ({ event }) => event.isDeployed,
                // Reset state when chain changes
                sending: null,
                token: {},
                recipientsCount: 0,
                totalAmount: 0n,
                allowance: 0n,
              }),
            },
          },
        },
      },
      on: {
        DISCONNECT: {
          target: "disconnected",
          actions: assign({
            isConnected: false,
            sending: null,
            token: {},
            recipientsCount: 0,
            totalAmount: 0n,
            allowance: 0n,
          }),
        },
      },
    },
  },
});

// Helper to map machine state to AppState enum for backward compatibility
export function getAppStateFromMachine(state: any) {
  const stateString = typeof state === "string" ? state : state.value;
  
  if (stateString === "disconnected") {
    return "UNLOCK_WALLET";
  }
  
  if (stateString?.includes("unsupportedNetwork")) {
    return "NETWORK_UNAVAILABLE";
  }
  
  if (stateString?.includes("idle")) {
    return "CONNECTED_TO_WALLET";
  }
  
  if (stateString?.includes("etherSelected.waitingForRecipients") || 
      stateString?.includes("tokenFlow.hasAllowance.waitingForRecipients")) {
    return "SELECTED_CURRENCY";
  }
  
  if (stateString?.includes("recipientsEntered")) {
    return "ENTERED_AMOUNTS";
  }
  
  if (stateString?.includes("tokenFlow.loading")) {
    return "CONNECTED_TO_WALLET";
  }
  
  if (stateString?.includes("tokenFlow.needsAllowance")) {
    return "SELECTED_CURRENCY";
  }
  
  return "CONNECTED_TO_WALLET";
}