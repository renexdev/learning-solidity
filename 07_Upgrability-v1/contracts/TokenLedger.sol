pragma solidity ^0.4.8;

/*
  IMPLEMENTING TOKEN STANDARD BASED ON: https://github.com/ConsenSys/Tokens
*/
contract TokenLedger {

  function TokenLedger()
  {

  }

  uint256 total_supply;
  bytes32 public title;
  bytes4 public symbol;

  mapping (address => uint256) balances;
  mapping (address => mapping (address => uint256)) allowed;

  event Transfer(address indexed _from, address indexed _to, uint256 indexed _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 indexed _value);

  /// @notice verifies if the sender has enough balance, otherwise, raises an error
  /// @param _from sender of value
  /// @param _value The amount of token to be transferred
  modifier hasEnoughBalance(address _from, uint256 _value)
  {
    if(_value == 0) throw;
    if(balances[_from] < _value) throw;
    if(balances[_from] + _value < balances[_from]) throw;
    _;
  }

  /// @notice verifies if the address msg.sender has enough balance approved from `_from` address
  /// @param _from approver of the transference
  /// @param _value The amount of token to be transferred
  modifier hasEnoughAllowedBalance(address _from, uint256 _value)
  {
    if(_value == 0) throw;
    if(allowed[_from][msg.sender] < _value) throw;
    if(allowed[_from][msg.sender] + _value < allowed[_from][msg.sender]) throw;
    _;
  }

  /// @notice set the TokenLedger symbol
  /// @param _symbol the symbol of the Organisation Share
  function setTokensSymbol(bytes4 _symbol)
  {
    symbol = _symbol;
  }

  /// @notice set the TokenLedger title
  /// @param _title the title of the Organisation Share
  function setTokensTitle(bytes32 _title)
  {
    title = _title;
  }

  /// @notice send `_value` token to `_to` from `msg.sender`
  /// @param _to The address of the recipient
  /// @param _value The amount of token to be transferred
  function transfer(address _to, uint256 _value)
  hasEnoughBalance(msg.sender, _value)
  {
      balances[msg.sender] -= _value;
      balances[_to] += _value;

      Transfer(msg.sender, _to, _value);
  }

  /// @notice send `_value` token/s to `_to` from `_from` on the condition it is approved by `_from`
  /// @param _from The address of the sender
  /// @param _to The address of the recipient
  /// @param _value The amount of token to be transferred
  function transferFrom(address _from, address _to, uint256 _value)
  hasEnoughBalance(_from, _value)
  hasEnoughAllowedBalance(_from, _value)
  {
      balances[_from] -= _value;
      balances[_to] += _value;

      allowed[_from][msg.sender] -= _value;

      Transfer(_from, _to, _value);
  }

  /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
  /// @param _spender The address of the account able to transfer the tokens
  /// @param _value The amount of wei to be approved for transfer
  function approve(address _spender, uint256 _value)
  {
    if(_value > total_supply) throw;

    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
  }

  /// @param _owner The address of the account owning tokens
  /// @param _spender The address of the account able to transfer the tokens
  /// @return Amount of remaining tokens allowed to spent
  function allowance(address _owner, address _spender)
  constant returns (uint256 remaining)
  {
    return allowed[_owner][_spender];
  }

  /// @param _owner The address from which the balance will be retrieved
  /// @return The balance
  function balanceOf(address _owner)
  constant returns (uint256 balance)
  {
    return balances[_owner];
  }

  /// @notice this function is used to increase the amount of shares available limited by `total_supply`
  /// and assign it to the contract owner.
  /// @param _amount The amount to be increased in the upper bound total_supply
  function generateTokens(uint256 _amount)
  {
    if(_amount == 0) throw;
    if (total_supply + _amount < _amount) throw;

    total_supply += _amount;
    balances[msg.sender] += _amount;
  }

  /// @return total amount of tokens
  function totalSupply()
  constant returns (uint256 _total)
  {
    return total_supply;
  }

	function () {
			// This function gets executed if a
			// transaction with invalid data is sent to
			// the contract or just ether without data.
			// We revert the send so that no-one
			// accidentally loses money when using the
			// contract.
			throw;
	}
}
