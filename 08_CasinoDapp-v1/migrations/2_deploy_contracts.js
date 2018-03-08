const Casino = artifacts.require("./Casino.sol")

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Casino,web3.toWei(0.1, 'ether'), {gas: 3000000});
  //GH version
  //first param min amount to be, second max bets
  //deployer.deploy(Casino,web3.toWei(0.1, 'ether'), 100, {gas: 3000000});

};
