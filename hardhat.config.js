require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const {MUMBAI_URL,PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks:{
    mumbai:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_URL}`,
      accounts: [PRIVATE_KEY],
    }
  }
};
