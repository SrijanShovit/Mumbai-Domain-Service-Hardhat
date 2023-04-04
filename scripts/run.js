const main = async() => {
  const [owner,randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("Contract deployed to:",domainContract.address);
  console.log("Contract deployed by:",owner.address);

  let txn = await domainContract.register("srijuu");
  await txn.wait();

  let domainAddress = await domainContract.getAddress("srijuu");
  console.log("Owner of domain srijuu:",domainAddress);

  txn = await domainContract.connect(randomPerson).setRecord("doom","hoo");
  await txn.wait();

  domainAddress = await domainContract.getAddress("srijuu");
  console.log("Owner of domain srijuu:",domainAddress);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

runMain();