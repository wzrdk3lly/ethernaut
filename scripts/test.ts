import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x290665897E441317ec52b664B1a6e6601d6312F5";
const PLAYER_ADDRES = "0x81215d34367AF48d01E728AfF2976d9Df32fE604";
async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRES);
  const contract = await ethers.getContractAt(
    "Telephone",
    CONTRACT_ADDRESS,
    signer
  );

  let contractOwner = await contract.owner();

  console.log(`The current contract owner is: ${contractOwner}`);

  console.log(
    `Lets call the change owner function and see who the new owner is? `
  );

  await contract.changeOwner("0x81215d34367AF48d01E728AfF2976d9Df32fE604");

  let contractNewOwner = await contract.owner();
  console.log(`The newly passed contract owner is: ${contractNewOwner} `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
