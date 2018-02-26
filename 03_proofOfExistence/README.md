# Learning Solidity: Proof Of existence (Zeppelin)

>The current repo is the result of unboxing webpack and follow the [Zeppelin](blog.zeppelin.solutions/the-hitchhikers-guide-to-smart-contracts-in-ethereum-848f08001f05) tut.

>So if you clone this there is no need of running in a terminal

    `truffle unbox webpack`

>Well, let's start. In another terminal
    `testrpc -u 0`

>Return to the main project terminal

    `truffle migrate --reset`

    `truffle console`

>Get the deployed version of our contract (in the terminal)

    `var poe = ProofOfExistence1.at(ProofOfExistence1.address)`

>Print its address 

    `poe.address`

    '0x6074179af564f3a1b2620f95e14cc941fbc4db58'

> Let's register our first "document"

    `poe.notarize('Zeppelin rocks')`

    { tx: '0x18ac...cb1a',
    receipt: 
    { transactionHash: '0x18ac...cb1a',
        ...
    },
    logs: [] }

> Let's now get the proof for that document

    `poe.proofFor('Zeppelin rocks')`

    0xa3287ff8d1abde95498962c4e1dd2f50a9f75bd8810bd591a64a387b93580ee7

> To check if the contract's state was correctly changed:

    `poe.proof()`

    0xa3287ff8d1abde95498962c4e1dd2f50a9f75bd8810bd591a64a387b93580ee7

> The hash matches the one we previously calculated

> Get the new version of the contract

    `var poe2 = ProofOfExistence2.at(ProofOfExistence2.address)`

> let's check for some new document, and it shouldn't be there.

    `poe2.checkDocument('hello')`

    false

> let's now add that document to the proof store

    `poe2.notarize('Aragon rocks')`

    { tx: '0x1d2d...413f',
      receipt: { ... },
      logs: []
    }

> let's now check again if the document has been notarized!

    `poe2.checkDocument('Aragon rocks')`

    true


> we can also store other documents and they are recorded too

    `poe2.notarize('Xamedis rocks');`

    `poe2.checkDocument('Xamedis rocks')`

    true

### You can deploy and play with the contract on the testnet (stop testrpc and run geth, or modify the truffle.js to choose a network)

    `geth --testnet --rpc console 2>> geth.log`

    `truffle migrate --reset`