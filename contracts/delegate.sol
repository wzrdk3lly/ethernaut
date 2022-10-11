// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Delegate {
    address public owner;

    constructor(address owner_) {
        owner = owner_;
    }

    function pwn() public {
        owner = msg.sender;
    }
}

contract Delegation {
    address public owner;
    Delegate delegate;

    constructor(address delegateAddress_) {
        delegate = Delegate(delegateAddress_);
        owner = msg.sender;
    }

    fallback() external {
        (bool result, ) = address(delegate).delegatecall(msg.data);
        if (result) {
            this;
        }
    }
}
