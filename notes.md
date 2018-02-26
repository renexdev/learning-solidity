[Public vs External Functions in Solidity](https://medium.com/@gus_tavo_guim/public-vs-external-functions-in-solidity-b46bcf0ba3ac)

>In a nutshell, public and external differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a public function while external read from calldata which a cheaper than memory allocation. I went on to the yellow paper to refresh my memory about call data opcodes.


#Recommended tuts

[Zeppelin](https://blog.zeppelin.solutions/)

[@gus_tavo_guim list](https://medium.com/@gus_tavo_guim)

[Basic set-get contract managed from truffle console](https://medium.com/@gus_tavo_guim/using-truffle-to-create-and-deploy-smart-contracts-95d65df626a2)

