// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const CONTRACT_ADDRESS = "";
const PLAYER_ADDRESS = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65";

async function main() {
  const signer = await hre.ethers.getSigner(PLAYER_ADDRESS);

  const contract = await hre.ethers.getContractAt("", CONTRACT_ADDRESS, signer);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
