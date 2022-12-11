require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-chai-matchers');
require("@nomiclabs/hardhat-solhint");
require('dotenv').config();

// defining accounts to reuse.
const accounts = process.env.PRIV_KEY ? [process.env.PRIV_KEY] : [];

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("hello", "Prints Hello World", () => console.log("Hello World!"));

task("accounts", "Prints the list of accounts with balances", async () => {
  const accounts = await ethers.getSigners();
  const provider = await ethers.provider;

  for (const account of accounts) {
    const balance = await provider.getBalance(account.address);
    console.log(`${account.address} - ${ethers.utils.formatEther(balance)} ETH`);
  }
});

task("deploy", "Deploys Contract", async () => {
  // uncomment to deploy deployer contract or use the deployed one at address: 0x22A640e326575A2C595A40e346783F96d576b6dA (goerli and mumbai)
  // const deployerContractFactory = await ethers.getContractFactory("Deployer");
  // const deployerContract = await deployerContractFactory.deploy();
  // await deployerContract.deployed();
  // console.log("deployer contract deployed at:", deployerContract.address);

  // deployer contract instance at address: Goerli or Mumbai
  const deployerContract = await ethers.getContractAt("Deployer", "0x22A640e326575A2C595A40e346783F96d576b6dA"); // ==> goerli and mumbai

  // get bytecode of greeter contract
  const greeterContractFactory = await ethers.getContractFactory("Greeter");
  const bytecode = greeterContractFactory.bytecode;

  // deploy greeter contract with salt
  const tx = await deployerContract.deployContract(bytecode, 12);
  // get returned contract address
  const receipt = await tx.wait();
  const deployedContractAddress = receipt.events[0].args[0];
  console.log("greeter contract deployed at:", deployedContractAddress);
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async ({ account }) => {
    const provider = await ethers.provider;
    const balance = await provider.getBalance(account);
    console.log(hre.ethers.utils.formatEther(balance), "ETH");
  });


module.exports = {
  defaultNetwork: "local",
  networks: {
    hardhat: {
      chainId: 1337
    },
    local: {
      url: "http://127.0.0.1:8545",
    },
    main: {
      url: process.env.ETHEREUM_MAINNET_RPC_URL,
      accounts: accounts
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts // private keys
    },
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts
    },
    polygonMain: {
      url: process.env.POLYGON_MAINNET_RPC_URL,
      accounts
    }
  },
  etherscan: {
    // API key for Polygonscan
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};