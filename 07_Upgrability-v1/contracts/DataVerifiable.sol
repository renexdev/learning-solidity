pragma solidity ^0.4.8;

contract DataVerifiable {

  /// @notice throws if ether was sent accidentally
  modifier refundEtherSentByAccident() {
    if(msg.value > 0) throw;
    _;
  }

  /// @notice throw if an address is invalid
  /// @param _target the address to check
  modifier throwIfAddressIsInvalid(address _target) {
    if(_target == 0x0) throw;
    _;
  }

  /// @notice throw if the id is invalid
  /// @param _id the ID to validate
  modifier throwIfIsEmptyString(string _id) {
    if(bytes(_id).length == 0) throw;
    _;
  }

  /// @notice throw if the uint is equal to zero
  /// @param _id the ID to validate
  modifier throwIfEqualToZero(uint _id) {
    if(_id == 0) throw;
    _;
  }

  /// @notice throw if the id is invalid
  /// @param _id the ID to validate
  modifier throwIfIsEmptyBytes32(bytes32 _id) {
    if(_id == "") throw;
    _;
  }
}
