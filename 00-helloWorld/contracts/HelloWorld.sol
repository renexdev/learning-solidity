pragma solidity ^0.4.18;

contract HelloWorld {
  address private creator;
  address private lastCaller;
  string private message;
  uint private totalGas;

  event GiveMeData(
    address _creator,
    address _lastCaller,
    string _message,
    uint _totalGas);
   /*
    HelloWorld contract with events   
  */

  function HelloWorld() {
    creator = tx.origin; //tx.origin: returns the sender of the transaction.
    totalGas = tx.gasprice; //tx.gasprice:` returns how much we pay for the transaction
    message = 'hello world';
  }

  function getMessage() constant returns(string) {
    return message;
  }

  function getLastCaller() constant returns(address) {
    return lastCaller;
  }

  function getCreator() constant returns(address) {
    return creator;
  }

  function getTotalGas() constant returns(uint) {
    return totalGas;
  }

  function setMessage(string newMessage) {
    message = newMessage;
    lastCaller = tx.origin;
    totalGas += tx.gasprice;
    GiveMeData(creator,lastCaller,message,tx.gasprice);
  }
}
