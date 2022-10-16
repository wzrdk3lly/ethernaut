import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "contractName",
    CONTRACT_ADDRESS,
    signer
  );

  // Comment out if you don't need the attacker account
  // const attackerContract = await ethers.getContractAt(
  //   "Attacker",
  //   ATTACKER_CONTRACT,
  //   signer
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
