const hre = require("hardhat");

async function main() {
  const LCM = await hre.ethers.getContractFactory("LCManager");
  const lcm = await LCM.deploy();

  await lcm.deployed();

  console.log(` deployed to ${lcm.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
