const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("shovit");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract owner:", owner.address);

  //second argument is value for money
  let txn = await domainContract.register("srijuu", { value: hre.ethers.utils.parseEther('2345') });
  await txn.wait();

  // try {
  //   let txn = await domainContract.register("srijuuaaaaaaaaaaaa", { value: hre.ethers.utils.parseEther('2345') });
  //   await txn.wait();
  //   let domainAddress = await domainContract.getAddress("srijuuaaaaaaaaaaaa");
  //   console.log("Owner of domain srijuu:", domainAddress);

  // } catch (error) {
  //   console.log(error);
  // }

  domainAddress = await domainContract.getAddress("srijuu");
  console.log("Owner of domain srijuu:", domainAddress);

  // txn = await domainContract.connect(randomPerson).setRecord("doom", "hoo");
  // await txn.wait();

  // domainAddress = await domainContract.getAddress("srijuu");
  // console.log("Owner of domain srijuu:", domainAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));


  //Grabbing funds from contract
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }

  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Owner balance after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();