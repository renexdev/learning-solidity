const getContract = name => artifacts.require(name)

const getBalanceInNumber = (receipt) => web3.eth.getBalance(receipt).toNumber()
const getBalanceInEth = (receipt) => web3.fromWei(getBalanceInNumber(receipt), 'ether')



contract('Game01Receipt', accounts => {
  let game01Receipt, alice, bob, externalUser, money

  beforeEach(async () => {
    money = web3.toWei(3, "ether");
    alice = accounts[1]
    bob = accounts[2]
    externalUser = accounts[3]
    game01Receipt = await getContract('Game01').new(alice,bob)
  })

  it('Who has money?', async () => {
    const game01Address = await game01Receipt.address;
    console.log('Game contract\'s balance: '+ getBalanceInEth(game01Address)+' ether');
    //console.log(web3.eth.getBalance(game01Address).toNumber());
    //Check fallback function that allows contract to accept ETH 
    let alicesEth = getBalanceInEth(alice)
    let bobsEth =  getBalanceInEth(bob)
    let faucetEth = getBalanceInEth(externalUser)
    console.log('Alice\'s balance : '+ alicesEth +' ether');
    console.log('Bob\'s balance   : '+ bobsEth +' ether'); 
    console.log('Faucet\'s balance: '+ faucetEth +' ether'); 
  })


  it('send money to contract Game 1', async () => {
    await game01Receipt.sendTransaction({ value:  money, from: externalUser })
    //Check fallback function that allows contract to accept ETH 
    const game01Address = await game01Receipt.address
    let faucetEth = getBalanceInEth(externalUser)
    console.log('Faucet\'s balance: '+ faucetEth +' ether');    
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
    let faucetEth = getBalanceInEth(externalUser)

    console.log('Alice\'s balance: '+ alicesEth +' ether');
    console.log('Bob\'s balance  : '+ bobsEth +' ether');
    // console.log('Faucet\'s balance: '+ faucetEth +' ether');    

    await game01Receipt.foo();

    let afterFooAlicesEth = getBalanceInEth(alice)
    let afterFooBobsEth = getBalanceInEth(bob)
    console.log('Difference in Alice\'s balance after Game01.foo(): '+  (afterFooAlicesEth-alicesEth)+' ether');
    console.log('Difference Bob\'s balance after Game01.foo()     : '+  (afterFooBobsEth-bobsEth)+' ether');
    console.log('Game contract\'s balance                         : '+ getBalanceInEth(game01Address)+' ether');

  })

    console.log('Press Crl+X to exit');

})


contract('Game02Receipt', accounts => {
  let game02Receipt, alice, bob, externalUser, money

  beforeEach(async () => {
    money = web3.toWei(3, "ether");
    alice = accounts[1]
    bob = accounts[2]
    externalUser = accounts[3]
    game02Receipt = await getContract('game02').new(alice,bob)
  })

  it('Who has money?', async () => {
    const game02Address = await game02Receipt.address;
    console.log('Game contract\'s balance: '+ getBalanceInEth(game02Address)+' ether');
    //console.log(web3.eth.getBalance(game02Address).toNumber());
    //Check fallback function that allows contract to accept ETH 
    let alicesEth = getBalanceInEth(alice)
    let bobsEth =  getBalanceInEth(bob)
    let faucetEth = getBalanceInEth(externalUser)
    console.log('Alice\'s balance : '+ alicesEth +' ether');
    console.log('Bob\'s balance   : '+ bobsEth +' ether'); 
    console.log('Faucet\'s balance: '+ faucetEth +' ether'); 
  })


  it('send money to contract Game 1', async () => {
    await game02Receipt.sendTransaction({ value:  money, from: externalUser })
    //Check fallback function that allows contract to accept ETH 
    const game02Address = await game02Receipt.address
    let faucetEth = getBalanceInEth(externalUser)
    console.log('Faucet\'s balance: '+ faucetEth +' ether');    
    assert.equal(getBalanceInNumber(game02Address), money)    

  })

  it('Who gets the money from foo()?', async () => {
    
    console.log('Filling Game 02 \'s contract with : '+ web3.fromWei(money, 'ether') +' ether');

    await game02Receipt.sendTransaction({ value: money, from: externalUser })

    const game02Address = await game02Receipt.address
    console.log('Game contract\'s balance: '+ getBalanceInEth(game02Address)+' ether');
    //console.log(web3.eth.getBalance(game02Address).toNumber());
    //Check fallback function that allows contract to accept ETH 
    let alicesEth = getBalanceInEth(alice)
    let bobsEth =  getBalanceInEth(bob)
    let faucetEth = getBalanceInEth(externalUser)

    console.log('Alice\'s balance: '+ alicesEth +' ether');
    console.log('Bob\'s balance  : '+ bobsEth +' ether');
    // console.log('Faucet\'s balance: '+ faucetEth +' ether');    

    await game02Receipt.foo();

    let afterFooAlicesEth = getBalanceInEth(alice)
    let afterFooBobsEth = getBalanceInEth(bob)
    console.log('Difference in Alice\'s balance after game02.foo(): '+  (afterFooAlicesEth-alicesEth)+' ether');
    console.log('Difference Bob\'s balance after game02.foo()     : '+  (afterFooBobsEth-bobsEth)+' ether');
    console.log('Game contract\'s balance                         : '+ getBalanceInEth(game02Address)+' ether');


  })


  it('Who gets the money from die()?', async () => {
    
    console.log('Filling Game 02 \'s contract with : '+ web3.fromWei(money, 'ether') +' ether');

    await game02Receipt.sendTransaction({ value: money, from: externalUser })

    const game02Address = await game02Receipt.address
    console.log('Game contract\'s balance: '+ getBalanceInEth(game02Address)+' ether');
    //console.log(web3.eth.getBalance(game02Address).toNumber());
    //Check fallback function that allows contract to accept ETH 
    let alicesEth = getBalanceInEth(alice)
    let bobsEth =  getBalanceInEth(bob)
    let faucetEth = getBalanceInEth(externalUser)

    console.log('Alice\'s balance: '+ alicesEth +' ether');
    console.log('Bob\'s balance  : '+ bobsEth +' ether');
    // console.log('Faucet\'s balance: '+ faucetEth +' ether');    

    await game02Receipt.die(alice);

    let afterFooAlicesEth = getBalanceInEth(alice)
    let afterFooBobsEth = getBalanceInEth(bob)
    let afterFooContractEth = getBalanceInEth(game02Address)
    console.log('Difference in Alice\'s balance after game02.die(): '+  (afterFooAlicesEth-alicesEth)+' ether');
    console.log('Difference Bob\'s balance after game02.die()     : '+  (afterFooBobsEth-bobsEth)+' ether');
    console.log('Game contract\'s balance                         : '+  afterFooContractEth +' ether');

  })



    console.log('Press Crl+X to exit');

})














