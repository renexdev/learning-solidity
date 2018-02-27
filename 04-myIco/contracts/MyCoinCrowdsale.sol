pragma solidity ^0.4.11;

import './MyCoin.sol';
import './lib/zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';


contract MyCoinCrowdsale is Crowdsale {

  function MyCoinCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet)
    Crowdsale(_startTime, _endTime, _rate, _wallet) {
  }

  // creates the token to be sold.
  // override this method to have crowdsale of a specific MintableToken token.
  function createTokenContract() internal returns (MintableToken) {
    return new MyCoin();
  }

}
