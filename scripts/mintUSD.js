const hre = require("hardhat");

async function main() {
  const contractAddress = "0x042889b1484a7D36ed732f23f2E42a835e6bBBD1";
  const myContract = await hre.ethers.getContractAt("USD", contractAddress);

  const mintToken = await myContract.mint(
    "0xe8Cf87aA003b0870d4393D3C18C04A96d7B42dA5",
    10000000
  );

  console.log("Trx hash:", mintToken.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
