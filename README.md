## Sybli Contracts

#### Overview

**This repository demonstrates How to deploy a contract on two different chains with same address.**

You should create an account and have some balances for the chains you wanted to deploy the contract (i.e ETH and MATIC). We should not do any transactions with it other than smart contracts deployment (Better to create a new account for this purpose). The reason is that having same nonce for all the chains will make the contract to be deployed on all the chains with same address with some tweaks using `CREATE2` opcode.

Inspect the `deploy` task in `hardhat.config.js` to see how the contract is deployed on two different chains. First, we will deploy deployer contract on both the chains. Then we will use this deployer contract to deploy the actual contract i.e `contracts/Greeter.sol` on both the chains. check the `contracts/Deployer.sol` file to see the implementation.

> Recommended to use Node.js v14+ and npm v7+.

> Rename `env.example` to `.env` and add your env specific keys.

Try running following tasks:

```shell
npm install

# compile contracts
npx hardhat compile

# deploy contract defined in tasks on specified network
npx hardhat deploy --network goerli
# then
npx hardhat deploy --network polygonMumbai

# show help
npx hardhat help
```

You should see the contract deployed on both the chains with same address.
