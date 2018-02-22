const HelloWorld = artifacts.require('HelloWorld')
const getContract = artifacts.require


contract('helloReceipt', accounts => {
  let helloReceipt

  before(async () => {
    helloReceipt = await getContract('HelloWorld').new()
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
        console.log('_totalGas: ',result.args._totalGas);
    });

    //eventFiltered = helloReceipt.logs.filter(l => l.event == 'GiveMeData')[0].args._creator
    
    const message = await helloReceipt.getMessage()
    assert.equal(message, 'topu', 'message is hola mundo')
  })
})
