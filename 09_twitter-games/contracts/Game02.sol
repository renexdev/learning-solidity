pragma solidity ^0.4.18;

contract Game02 {


  address private alice;
  address private bob;
  
  function Game02(address _alice, address _bob) {
    alice = _alice;
    bob = _bob;
  }


  function foo() public { 
    this.die(this);
    this.die(alice);
  }

  function die(address x) {
    selfdestruct(x);
  }

  function () public payable{}
}



