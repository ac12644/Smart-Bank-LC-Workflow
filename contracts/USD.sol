pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract USD is ERC20Detailed, ERC20Capped, Ownable {
    constructor()
        public
        payable
        ERC20Detailed("US Dollar", "USD", 2)
        ERC20Capped(10000000000)
        MinterRole()
    {}
}
