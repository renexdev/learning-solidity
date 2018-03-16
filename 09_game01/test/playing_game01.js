const getContract = name => artifacts.require(name)

const getBalanceInNumber = (receipt) => web3.eth.getBalance(receipt).toNumber()
const getBalanceInEth = (receipt) => web3.fromWei(getBalanceInNumber(receipt), 'ether')



contract('game01Receipt', accounts => {
  let game01Receipt, alice, bob, externalUser, money

  beforeEach(async () => {
    money = web3.toWei(3, "ether");
    alice = accounts[1]
    bob = accounts[2]
    externalUser = accounts[3]
    game01Receipt = await getContract('Game01').new(alice,bob)
  })

  it('send money to contract Game 1', async () => {
    await game01Receipt.sendTransaction({ value:  money, from: externalUser })
    //Check fallback function that allows contract to accept ETH 
    const game01Address = await game01Receipt.address
    assert.equal(getBalanceInNumber(game01Address), money)    
  })

  it('Who gets the money?', async () => {
    
    console.log('Filling Game 01 \'s contract with : '+ web3.fromWei(money, 'ether') +' ether');

    await game01Receipt.sendTransaction({ value: money, from: externalUser })

    const game01Address = await game01Receipt.address
    console.log('Game contract\'s balance: '+ getBalanceInEth(game01Address)+' ether');
    //console.log(web3.eth.getBalance(game01Address).toNumber());
    //Check fallback function that allows contract to accept ETH 
    let alicesEth = getBalanceInEth(alice)
    let bobsEth =  getBalanceInEth(bob)
    console.log('Alice\'s balance: '+ alicesEth +' ether');
    console.log('Bob\'s balance: '+ bobsEth +' ether');

    await game01Receipt.foo();

    let afterFooAlicesEth = getBalanceInEth(alice)
    let afterFooBobsEth = getBalanceInEth(bob)
    console.log('Difference in Alice\'s balance after Game01.foo(): '+  (afterFooAlicesEth-alicesEth)+' ether');
    console.log('Difference Bob\'s balance after Game01.foo(): '+  (afterFooBobsEth-bobsEth)+' ether');
  })

    console.log('Press Crl+X to exit');

})
