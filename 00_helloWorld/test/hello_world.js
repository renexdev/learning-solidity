const HelloWorld = artifacts.require('HelloWorld')
const getContract = artifacts.require


contract('helloReceipt', accounts => {
  let helloReceipt

  before(async () => {
    helloReceipt = await HelloWorld.new()

    /*
    //https://github.com/trufflesuite/truffle-contract
    You now have access to the following functions on MyContract, as well as many others:
    at(): Create an instance of MyContract that represents your contract at a specific address.
    deployed(): Create an instance of MyContract that represents the default address managed by MyContract.
    new(): Deploy a new version of this contract to the network, getting an instance of MyContract that represents the newly deployed instance.
    */
  })

  it('sets the first account as the contract creator', async () => {
    const creator = await helloReceipt.getCreator()
    assert.equal(creator, accounts[0], 'main account is the creator')
  })

  it('has hello world as initial message ', async () => {
    const message = await helloReceipt.getMessage()
    assert.equal(message, 'hello world', 'message is hello world')
  })

  it('changes the message via setMessage', async () => {
    //catch both setMessage
    //var event = helloReceipt.GiveMeData();
    await helloReceipt.setMessage('hola mundo')
    await helloReceipt.setMessage('topu')

    //catch last setMessage
    var event = helloReceipt.GiveMeData();

    event.watch(function(error, result){
      if (!error)
        console.log('_creator: ',result.args._creator);
        console.log('_lastCaller: ',result.args._lastCaller);
        console.log('_message: ',result.args._message);
        console.log('_totalGas: ',result.args._totalGas.toNumber());
    });

    const message = await helloReceipt.getMessage()
    assert.equal(message, 'topu', 'message is hola mundo')
  })
    console.log('Press Crl+X to exit');

})
