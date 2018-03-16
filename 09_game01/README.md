# Learning Solidity: Playing  maurelian's game 01 @maurelian_ 

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
Play changin selfdestruct order...
```
    function foo() public {
        selfdestruct(bob);
        selfdestruct(alice);
  }
```