# Some Solidity definitions:

[Public vs External Functions in Solidity](https://medium.com/@gus_tavo_guim/public-vs-external-functions-in-solidity-b46bcf0ba3ac)

>In a nutshell, public and external differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a public function while external read from calldata which a cheaper than memory allocation. I went on to the yellow paper to refresh my memory about call data opcodes.