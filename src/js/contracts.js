export const disperse = {
  abi: [
    'function disperseEther(address[] recipients, uint256[] values)',
    'function disperseToken(address token, address[] recipients, uint256[] values)',
    'function disperseTokenSimple(address token, address[] recipients, uint256[] values)',
  ],
  address: {
    1: '0xD152f549545093347A162Dce210e7293f1452150',     // mainnet
    3: '0xD152f549545093347A162Dce210e7293f1452150',     // ropsten
    4: '0xD152f549545093347A162Dce210e7293f1452150',     // rinkeby
    42: '0xD152f549545093347A162Dce210e7293f1452150',    // kovan
    77: '0xD152f549545093347A162Dce210e7293f1452150',    // poa sokol
    99: '0xD152f549545093347A162Dce210e7293f1452150',    // poa network
    100: '0xD152f549545093347A162Dce210e7293f1452150',   // xdai chain
    163: '0xD152f549545093347A162Dce210e7293f1452150',   // lightstreams
    5777: '0x5b1869d9a4c187f2eaa108f3062412ecf0526b24',  // ganache-cli
  },
}

export const erc20 = {
  abi: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address, address) view returns (uint256)',
    'function approve(address, uint256) returns (bool)',
  ]
}

export const ds_token = {
  abi: [
    'function name() view returns (bytes32)',
    'function symbol() view returns (bytes32)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address, address) view returns (uint256)',
    'function approve(address, uint256) returns (bool)',
  ]
}
