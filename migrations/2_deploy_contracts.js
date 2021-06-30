const GeoCashFlow = artifacts.require("GeoCashFlow");

// Superfluid contract addresses for Goerli 
// https://docs.superfluid.finance/superfluid/networks/networks
const owner = "0x37defff157ddff1140062bcb2f44beabf078b15c";
const host = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";
const cfa = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8";
const ethx = "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947";

module.exports = async deployer => {
  await deployer.deploy(GeoCashFlow, owner, host, cfa, ethx);
};
