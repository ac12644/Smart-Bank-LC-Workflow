const hre = require("hardhat");

async function main() {
  const USD = await hre.ethers.getContractFactory("USD");
  const usd = await USD.deploy();

  await usd.deployed();

  console.log(` deployed to ${usd.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
