import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0x903bdD4bCCDC8F2eF30088fc8c7f8a1070063c99";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Reentrance",
    CONTRACT_ADDRESS,
    signer
  );
  const attackerContractFactory = await ethers.getContractFactory(
    "Attacker",
    signer
  );

  const attackerContract = await attackerContractFactory.deploy();

  console.log(attackerContract);
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
