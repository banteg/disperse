pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";


contract TestToken is ERC20Detailed("Faux Test Token", "FTT", 18), ERC20Mintable {
    constructor() public {
        _mint(msg.sender, 1000 ether);
    }
}
