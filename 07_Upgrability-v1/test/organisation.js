
const getContract = name => artifacts.require(name)

contract('Factory', (accounts) => {
    let parent

    before(async () => {

    const bases = ['TokenLedger', 'EternalStorage']
    baseDeployed = await Promise.all(bases.map(c => getContract(c).new()))
    baseAddrs = baseDeployed.map(c => c.address)
   
    console.log('TokenLedger and EternalStorage addrs: ', baseAddrs);
    
    //Libs 
    const proposalsLibrary = await getContract('ProposalsLibrary').new()
    const securityLibrary = await getContract('SecurityLibrary').new()

    //Organization and Parent Contracts
    const Organisation = getContract('Organisation')
    const Parent = getContract('Parent')

    Organisation.link('ProposalsLibrary', proposalsLibrary.address)
    Organisation.link('SecurityLibrary', securityLibrary.address)
    Parent.link('ProposalsLibrary', proposalsLibrary.address)
    Parent.link('SecurityLibrary', securityLibrary.address)

    const organization = await Organisation.new(baseAddrs[0] , baseAddrs[1])

    parent = await Parent.new()
    console.log('Organization contract deployed at: ', parent.address);
    console.log('Parent contract deployed at: ', organization.address);
  })

  it('create an organization from factory (Parent)', async () => {
    receipt = await parent.createOrganisation('Xamedis', {from: accounts[0]})
    organizationAddr = receipt.logs.filter(l => l.event == 'OrganisationCreated')[0].args.organisation
    assert.equal(await parent.getOrganisation('Xamedis'), organizationAddr, 'Xamedis should be resolved')
  })

})
