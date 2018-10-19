# disperse

_verb_ distribute erc-20 tokens to many addresses in just two transactions

## interface

```
disperseEther(address[] recipients, uint256[] values)
disperseToken(IERC20 token, address[] recipients, uint256[] values)
disperseTokenSimple(IERC20 token, address[] recipients, uint256[] values)
```

## optimizations

`disperseToken` function first transfers the tokens to the contract addresses using `transferFrom` and then uses `transfer` to distribute them.

this approach reduces gas costs by 1/3 as `transfer` updates state only twice (balances) instead of also updating allowance as `transferFrom` does.

`disperseTokenSimple` function only uses `transferFrom`, use it if you prefer the transfers to come from your address.

gas usage also depends on each recipient's balance, previous zero balance being the worst case.
