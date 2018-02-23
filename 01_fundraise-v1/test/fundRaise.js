//Truffle uses the Mocha testing framework as well as Chai assertion library under the hood.

const FundRaise = artifacts.require('./FundRaise.sol')

contract('FundRaise', accounts => {
    const owner = accounts[0]
    const donor = accounts[1]
    const external = accounts[2]


    let fundRaise

    beforeEach('setup contract for each test', async function () {
        fundRaise = await FundRaise.new(owner)
    })

    it('has an owner', async function () {
        //https://github.com/trufflesuite/truffle/blob/beta/lib/testing/Assert.sol
        assert.equal(await fundRaise.owner(), owner)
    })

    it('accepts funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        //Check fallback function that allows contract to accept ETH 
        const fundRaiseAddress = await fundRaise.address
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)
    })

    it('is able to pause and unpause fund activity', async function () {
        await fundRaise.pause()

        try {
            await fundRaise.sendTransaction({ value: 1e+18, from: donor })
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
        const fundRaiseAddress = await fundRaise.address
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 0)

        await fundRaise.unpause()
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)
    })

    it('permits owner to receive funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        const ownerBalanceBeforeRemovingFunds = web3.eth.getBalance(owner).toNumber()

        const fundRaiseAddress = await fundRaise.address
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), ownerBalanceBeforeRemovingFunds+1e+18)

        await fundRaise.removeFunds()

        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 0)
        assert.isAbove(web3.eth.getBalance(owner).toNumber(), ownerBalanceBeforeRemovingFunds)
    })

})