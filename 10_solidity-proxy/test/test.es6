'use strict';

const lkTestHelpers = require('lk-test-helpers')
const {
  expectThrow
} = lkTestHelpers(web3)

const Example = artifacts.require('./Example.sol')
const ExampleReverts = artifacts.require('./ExampleReverts.sol')
const Example2 = artifacts.require('./Example2.sol')
const Dispatcher = artifacts.require('Dispatcher.sol')
const DispatcherStorage = artifacts.require('DispatcherStorage.sol')
const TheContract = artifacts.require('TheContract.sol')

contract('TestProxyLibrary', (accounts) => {
  describe('test', () => {
    it('works', async () => {
      // Create a new Lib called Example
      const example = await Example.new()
      // create a storage for the lib Example
      const dispatcherStorage = await DispatcherStorage.new(example.address)
      console.log("Dispatcher Storage contract address: ",dispatcherStorage.address)   
      // This is magic: it replaces the Dispatcher Storage address with the new 
      // one created before. slice(2) removes '0x' from address. This is done with
      // assembly code in the fallback function of the Dispatcher, see Dispatcher.sol.    
      Dispatcher.unlinked_binary = Dispatcher.unlinked_binary
          .replace('1111222233334444555566667777888899990000',
              dispatcherStorage.address.slice(2))
      // Once the address is set pointing to Example contract, a Dispatcher is created    
      const dispatcher = await Dispatcher.new()
      // and the contract is linked to that library.
      TheContract.link('LibInterface', dispatcher.address);
      // Now, one can create the contract, linked to the library Example
      const thecontract = await TheContract.new()
      await thecontract.set(10)
      const x = await thecontract.get()
      console.log("Example  x: ",x)
      console.log("unlinked_binary: ",Dispatcher.bytecode)
      assert.equal(x.toNumber(), 10)// Example return not multiplies

      // Create another library
      const example2 = await Example2.new()
      // Now we simply replace the library by the new one
      // calling replace ant Dispatcher Storage
      await dispatcherStorage.replace(example2.address)
      const x2 = await thecontract.get()
      console.log("Example2 x: ",x2)      
      assert.equal(x2.toNumber(), 10 * 10);// Example2 return 10 multiplies

      const exampleReverts = await ExampleReverts.new()
      await dispatcherStorage.replace(exampleReverts.address)
      await expectThrow(thecontract.get())
    });
    it('measure gas costs', (done) => {
      done();
    });

    context('can call only owner', () => {
      let example, example2, dispatcherStorage, subject
      beforeEach(async () => {
        example = await Example.new()
        example2 = await Example2.new()
        dispatcherStorage = await DispatcherStorage.new(example.address, {from: accounts[0]})
        subject = (account) => dispatcherStorage.replace(example2.address, {from: account})
      })

      it('fail', async () => {
        await expectThrow(subject(accounts[1]))
      })
      it('success', async () => {
        const result = await subject(accounts[0])
        assert.isOk(result)
      })
    })
  });
})
;
