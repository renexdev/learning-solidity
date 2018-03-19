pragma solidity ^0.4.8;

import "../contracts/LibInterface.sol";

library ExampleReverts {
  function getUint() public constant returns (uint) {
    revert();
  }
  function setUint(LibInterface.S storage s, uint i) public {
    s.i = i;
  }
}
