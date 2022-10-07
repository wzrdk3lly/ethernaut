import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0xd5aCD6fc77F520c6EA3442C0A9390A9d61A19B43"; //This is the instance address
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "CoinFlip",
    CONTRACT_ADDRESS,
    signer
  );

  // making a coinflip
  console.log("sending a coinflip");
  await contract.flip(false);
  // see if I won the flip
  console.log(await contract.consecutiveWins());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
