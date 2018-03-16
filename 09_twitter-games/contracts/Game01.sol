pragma solidity ^0.4.18;

contract Game01 {

  address private alice;
  address private bob;
  //address alice = 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c; 
  //address bob = 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db; 
  
  function Game01(address _alice, address _bob) {
    alice = _alice;
    bob = _bob;
  }

  function foo() public {
        selfdestruct(bob);
        selfdestruct(alice);

  }
  function () public payable{}
}


contract Game02 {


  address private alice;
  address private bob;
  
  function Game01(address _alice, address _bob) {
    alice = _alice;
    bob = _bob;
  }


  function foo() public { 
    this.die(this);
    this.die(alice);
  }

  function die(address x) { selfdestruct(x); }

  function () public payable{}
}





