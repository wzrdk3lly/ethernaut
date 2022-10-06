// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0; // @audit - changed pragma to get it to work in remix

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/math/SafeMath.sol"; // changed import to get it to work in remix

contract Fallout {
  
  using SafeMath for uint256;
  mapping (address => uint) allocations;
  address payable public owner;


  /* constructor */// also this is an unusual contructor
  function Fal1out() public payable { // i don't like the 1 used as an l but lets do it.
    owner = msg.sender;
    allocations[owner] = msg.value;
  }
  // the function is now public and anyone can call it since it's not a constructor.
  // when you call it like this, you become the contract owner.

  modifier onlyOwner {
	        require(
	            msg.sender == owner,
	            "caller is not the owner"
	        );
	        _;
	    }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint) {
    return allocations[allocator];
  }
}