pragma solidity ^0.4.13;

import './lib/zeppelin-solidity/contracts/token/MintableToken.sol';

contract MyCoin is MintableToken {
  string public name = "MY COIN";
  string public symbol = "MYC";
  uint256 public decimals = 18;
}
