pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract TestToken is DetailedERC20("Faux Test Token", "FTT", 18), MintableToken {
    constructor() public {
        mint(msg.sender, 1000 ether);
    }
}
