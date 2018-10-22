export const disperse = {
  abi: [
    'function disperseEther(address[] recipients, uint256[] values)',
    'function disperseToken(address token, address[] recipients, uint256[] values)',
    'function disperseTokenSimple(address token, address[] recipients, uint256[] values)',
  ],
  address: {
    3: '0xD152f549545093347A162Dce210e7293f1452150',     // ropsten
    4: '0xD152f549545093347A162Dce210e7293f1452150',     // rinkeby
    42: '0xD152f549545093347A162Dce210e7293f1452150',    // kovan
    5777: '0x634ad8bf795655b3d855be5e7cc97a0cdcdb6497',  // ganache-cli
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
