# Learning Solidity: casino dapp

Following the casino dapp sample from the medium post [The ultimate end-to-end tutorial to create and deploy a fully decentralized Dapp in ethereum by Merunas Grincalaitis](https://medium.com/@merunasgrincalaitis/the-ultimate-end-to-end-tutorial-to-create-and-deploy-a-fully-descentralized-dapp-in-ethereum-18f0cf6d7e0e). 

>Open your terminal

>Install node

>Install node packtages:
>truffle

    `npm i -g truffle`
    `npm i -g webpack-dev-server`
    `npm i -g http-server`

>testrpc 

    `npm i -g truffle ethereumjs-testrpc`

>run a develepment ethereum node (edit ./truffle-config.js) in another terminal

    `testrcp`

>Deploy the contracts to your dev network

    `npm run deploy`

and put the Casino address into  `contractAddr` variable in `./src/js/index.js`. You can also run `truffle console` and type `Casino.address` to get the contract address.

>Compile the contracts and the react project

    `npm run compile`

>Run the webpage at `http://localhost:8081/` running

    `npm run start`

>Get some ethers from your testrpc, open another terminal and run `truffle console` then type  `web3.eth.sendTransaction({from: web3.eth.accounts[0],to: "0xF639961D80D8f5AcBE75f91C1624A8Ce8279456b", value: web3.toWei(10, "ether")})` where '0xF639961D80D8f5AcBE75f91C1624A8Ce8279456b' is your Metamask address. Remember connect Metamask to your testrcp network =).


>Notes: Development environment: Sublime + solidity module + view -> layeout -> Columns:2 (1: *.sol files|2: *.js files)