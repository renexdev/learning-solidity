# Learning Solidity: Playing  maurelian's game (@maurelian_) and izqui's game (@izqui)

>Open your terminal

>Install node

>Install node packtages:
>truffle

    `npm i -g truffle`

>testrpc 

    `npm i -g truffle ethereumjs-testrpc`

>run a develepment ethereum node (edit ./truffle-config.js) in another terminal

    `testrcp`

>Test your functions (./test/yourtests.js)

    `truffle test`

>Would be this the correct answer?

>In game 1 u can play with the code changing objet order in selfdestruct fn ...
```
    function foo() public {
        selfdestruct(bob);
        selfdestruct(alice);
  }
```