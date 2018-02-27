module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" //Match any development network id
    },
    rinkeby: {
      host: "localhost", // Connect to our running geth on the specified host param
      port: 8545,
      network_id: 4,
      gas: 4612388 // Common gas limit used for deploys
    }
  }
};
