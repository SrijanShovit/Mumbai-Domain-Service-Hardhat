const main = async() => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("shovit");
    await domainContract.deployed();

    console.log("Contract deployed to:",domainContract.address);

    let txn = await domainContract.register("saibhu",{
        value:hre.ethers.utils.parseEther('0.1')
    });
    await txn.wait();
    console.log("Minted domain saibhu.shovit");

    txn = await domainContract.setRecord("saibhu","I like Monginis cake");
    await txn.wait();
    console.log("Set record for saibhu.shovit");

    const address = await domainContract.getAddress("saibhu");
    console.log("Owner of domain saibhu:",address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:",hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

runMain();