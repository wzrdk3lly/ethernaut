// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;// Flaoting pragma is not a best practices 

contract Telephone {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {  // @audit - tx.origin tags are a no no. 
      owner = _owner;
    }
  }
}