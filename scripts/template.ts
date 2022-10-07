import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "";
const PLAYER_ADDRES = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
async function main() {
  const signer = ethers.getSigner(PLAYER_ADDRES);
  const contract = ethers.getContractAt("coinflip", CONTRACT_ADDRESS);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
