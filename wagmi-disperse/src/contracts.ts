export const disperse = {
  abi: [
    {
      name: 'disperseEther',
      type: 'function',
      stateMutability: 'payable',
      inputs: [
        { name: 'recipients', type: 'address[]' },
        { name: 'values', type: 'uint256[]' }
      ],
      outputs: []
    },
    {
      name: 'disperseToken',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'token', type: 'address' },
        { name: 'recipients', type: 'address[]' },
        { name: 'values', type: 'uint256[]' }
      ],
      outputs: []
    },
    {
      name: 'disperseTokenSimple',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'token', type: 'address' },
        { name: 'recipients', type: 'address[]' },
        { name: 'values', type: 'uint256[]' }
      ],
      outputs: []
    }
  ] as const,
  address: {
    1: "0xD152f549545093347A162Dce210e7293f1452150", // mainnet
    3: "0xD152f549545093347A162Dce210e7293f1452150", // ropsten
    4: "0xD152f549545093347A162Dce210e7293f1452150", // rinkeby
    5: "0xD152f549545093347A162Dce210e7293f1452150", // goerli
    42: "0xD152f549545093347A162Dce210e7293f1452150", // kovan
    56: "0xD152f549545093347A162Dce210e7293f1452150", // bsc mainnet
    77: "0xD152f549545093347A162Dce210e7293f1452150", // poa sokol
    99: "0xD152f549545093347A162Dce210e7293f1452150", // poa network
    100: "0xD152f549545093347A162Dce210e7293f1452150", // xdai chain
    137: "0xD152f549545093347A162Dce210e7293f1452150", // matic
    163: "0xD152f549545093347A162Dce210e7293f1452150", // lightstreams
    250: "0xD152f549545093347A162Dce210e7293f1452150", // fantom
    5777: "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24", // ganache-cli
    42161: "0xD152f549545093347A162Dce210e7293f1452150", // arbitrum one
    4689: "0xe3122e446Bf31036DA212375803f24b3dE96D0c9", // iotex
    1284: "0xD152f549545093347A162Dce210e7293f1452150", // moonbeam
    1285: "0xD152f549545093347A162Dce210e7293f1452150", // moonriver
    42220: "0xD152f549545093347A162Dce210e7293f1452150", // celo
    1666600000: "0xD152f549545093347A162Dce210e7293f1452150", // harmony
    60: "0xD152f549545093347A162Dce210e7293f1452150", // gochain
    128: "0xD152f549545093347A162Dce210e7293f1452150", // huobi
    66: "0xD152f549545093347A162Dce210e7293f1452150", // okex
    10: "0xD152f549545093347A162Dce210e7293f1452150", // optimism
    84531: "0xD152f549545093347A162Dce210e7293f1452150", // base goerli
    1101: "0xD152f549545093347A162Dce210e7293f1452150", // polygon zkevm
    8453: "0xD152f549545093347A162Dce210e7293f1452150", // base mainnet
    11155111: "0xD152f549545093347A162Dce210e7293f1452150", // sepolia
    314: "0xD152f549545093347A162Dce210e7293f1452150", // filecoin
  } as const,
};

export const erc20 = {
  abi: [
    {
      name: 'name',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'string' }]
    },
    {
      name: 'symbol',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'string' }]
    },
    {
      name: 'decimals',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint8' }]
    },
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    },
    {
      name: 'allowance',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' }
      ],
      outputs: [{ name: '', type: 'uint256' }]
    },
    {
      name: 'approve',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [{ name: '', type: 'bool' }]
    }
  ] as const,
};

export const ds_token = {
  abi: [
    {
      name: 'name',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'bytes32' }]
    },
    {
      name: 'symbol',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'bytes32' }]
    },
    {
      name: 'decimals',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint8' }]
    },
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'src', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    },
    {
      name: 'allowance',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' }
      ],
      outputs: [{ name: '', type: 'uint256' }]
    },
    {
      name: 'approve',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [{ name: '', type: 'bool' }]
    }
  ] as const,
};