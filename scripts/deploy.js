const hre = require("hardhat");

async function main() {
  // Deploying the USD contract
  const USD = await hre.ethers.getContractFactory("USD");
  const usd = await USD.deploy();
  await usd.deployed();
  console.log(`USD deployed to ${usd.address}`);

  // Deploying the LCManager contract
  const LCM = await hre.ethers.getContractFactory("LCManager");
  const erc20Address = usd.address; // Using the address of the USD contract we just deployed
  const lcm = await LCM.deploy(erc20Address);
  await lcm.deployed();
  console.log(`LCManager deployed to ${lcm.address}`);

  // Minting tokens to LCManager
  const contractAddress = usd.address; // USD CONTRACT ADDRESS
  const myContract = await hre.ethers.getContractAt("USD", contractAddress);
  const mintToken = await myContract.mint(
    lcm.address, // LCManager CONTRACT ADDRESS
    10000000
  );
  console.log("Trx hash:", mintToken.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
