// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0; // audit - bad practice to use floating point 

import '@openzeppelin/contracts/math/SafeMath.sol'; // this uses openzeplins import safe math stuff

contract Fallback {

  using SafeMath for uint256;
  mapping(address => uint) public contributions;
  address payable public owner;

  constructor() public { // as soon as this contract initialized this happens
    owner = msg.sender;
    contributions[msg.sender] = 1000 * (1 ether);
    // the sender becomes the owner and the contributions get set
  }

  modifier onlyOwner {
        require(
            msg.sender == owner,
            "caller is not the owner"
        );
        _; // this just states to continue the execution
    }

  function contribute() public payable {
    require(msg.value < 0.001 ether);
    contributions[msg.sender] += msg.value;
    if(contributions[msg.sender] > contributions[owner]) {
      owner = msg.sender;
    }
  }

  function getContribution() public view returns (uint) {
    return contributions[msg.sender];
  }

  function withdraw() public onlyOwner {
    owner.transfer(address(this).balance);
  }
    // anytime that ether is sent to the contract and there is no specific function that specified then the money will get dropped in here 
  receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
}