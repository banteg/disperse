export const disperseAbi = [
  {
    constant: false,
    payable: false,
    type: "function",
    inputs: [
      { name: "token", type: "address" },
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" },
    ],
    name: "disperseTokenSimple",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    constant: false,
    payable: false,
    type: "function",
    inputs: [
      { name: "token", type: "address" },
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" },
    ],
    name: "disperseToken",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    constant: false,
    payable: true,
    type: "function",
    inputs: [
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" },
    ],
    name: "disperseEther",
    outputs: [],
    stateMutability: "payable",
  },
] as const