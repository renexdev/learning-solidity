# Learning Solidity: My ICO (Zeppelin)

>The current repo is the result of unboxing webpack and follow the [Zeppelin]((https:>blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6) tut.

>So if you clone this there is no need of running in a terminal

    `truffle unbox webpack`

>Well, let's start. In another terminal type

    `testrpc -u 0`

>Return to the main project terminal

    `truffle migrate --reset`

    `truffle console`

> The account that will buy MYC tokens.

    `account1 = web3.eth.accounts[1]`

    0xce9cf5e8ee78142613001b5b6488a3718ed7e6ae

> The address of the MYC token instance that was created when the crowdsale contract was deployed

> Assign the result of MyCoinCrowdsale.deployed() to the variable crowdsale

    `MyCoinCrowdsale.deployed().then(inst => { crowdsale = inst })`

    `crowdsale.token().then(addr => { tokenAddress = addr } )`

>tokenAddress

    0x3ec2b2060227614dba83f06daed7b96c6da6b8cd


    `MyCoinInstance = MyCoin.at(tokenAddress)`

>Now check the number of MYC tokens account1 has. It should have 0

    `MyCoinInstance.balanceOf(account1).then(balance => balance.toString(10))`

    0

> Buying MYC tokens

    `MyCoinCrowdsale.deployed().then(inst => inst.sendTransaction({ from: account1, value: web3.toWei(5, "ether")}))`

>output

    { tx: '0x68aa48e1f0d0248835378caa1e5b2051be35a5ff1ded82878683e6072c0a0cfc',
      receipt:
       { transactionHash: '0x68aa48e1f0d0248835378caa1e5b2051be35a5ff1ded82878683e6072c0a0cfc',
         transactionIndex: 0,
         blockHash: '0xb48ceed99cf6ddd4f081a99474113c4c16ecf61f76625a6559f1686698ee7d57',
         blockNumber: 5,
         gasUsed: 68738,
         cumulativeGasUsed: 68738,
         contractAddress: null,
         logs: [] },
      logs: [] }
    undefined

> Check the amount of MYC tokens for account1 again. It should have some now.

    `MyCoinInstance.balanceOf(account1).then(balance => account1MYCTokenBalance = balance.toString(10))`

    5000000000000000000000

> When we created our token we made it with 18 decimals, which the same as what ether has. That's a lot of zeros, let's display without the decimals:

    `web3.fromWei(account1MYCTokenBalance, "ether")`

    5000