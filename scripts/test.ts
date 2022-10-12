import { ethers } from "hardhat";
import { expect } from "chai";

const CONTRACT_ADDRESS = "0xD3a8e62a14410F3bCA078A2d7ccE422Bf0B77C48";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0x0cB1b57838C55A73859E821F9a21cda08D60232E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Force",
    CONTRACT_ADDRESS,
    signer
  );

  const attackerContractFactory = await ethers.getContractFactory(
    "Attacker",
    signer
  );

  const attackerContract = await attackerContractFactory.deploy();

  console.log("lets deploy the attacker contract", attackerContract);

  // console.log("Attacker contract deployment ");
  // await expect(attackerContract)
  //   .to.emit(attackerContract, "depositEmitter")
  //   .withArgs(3);

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
