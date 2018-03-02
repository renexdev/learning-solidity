const assertEvent = require('./helpers/assertEvent')

const getContract = name => artifacts.require(name)
const getOrganisationFromLog = receipt => receipt.logs.filter(x => x.event == 'OrganisationCreated')[0].args.organisation

contract('Factory', (accounts) => {
    let parent, Organisation, OrganisationAddr, proposalsLibrary = {}
    owner = accounts[0]
    before(async () => {

        const bases = ['TokenLedger', 'EternalStorage']
        baseDeployed = await Promise.all(bases.map(c => getContract(c).new()))
        baseAddrs = baseDeployed.map(c => c.address)
       
        console.log('TokenLedger and EternalStorage addrs: ', baseAddrs);
        
        //Libs 
        proposalsLibrary = await getContract('ProposalsLibrary').new()
        const securityLibrary = await getContract('SecurityLibrary').new()

        //Organization and Parent Contracts
        const Organisation = getContract('Organisation')

        const Parent = getContract('Parent')

        //Organisation.link('ProposalsLibrary', proposalsLibrary.address)
        //Organisation.link('SecurityLibrary', securityLibrary.address)
        Parent.link('ProposalsLibrary', proposalsLibrary.address)
        Parent.link('SecurityLibrary', securityLibrary.address)

        //const Organisation = await Organisation.new(baseAddrs[0] , baseAddrs[1])

        parent = await Parent.new()
        console.log('Organization contract deployed at: ', parent.address);
        //console.log('Parent contract deployed at: ', Organisation.address);
        
        receipe = await parent.createOrganisation('Xamedis', {from: owner})
        organisation = Organisation.at(getOrganisationFromLog(receipe))
        organisationAddr = organisation.address
        console.log("org addr generated from Factory (parent): ",organisationAddr)
        //Organisation = await parent.createOrganisation('Xamedis', {from: owner})
        //assertEvent(Organisation, 'OrganisationCreated') //defined in helpers
        //OrganisationAddr = Organisation.logs.filter(l => l.event == 'OrganisationCreated')[0].args.organisation
    })

    it('can create an organisation from factory (Parent)', async () => {
        assert.equal(await parent.getOrganisation('Xamedis'), organisationAddr, 'Xamedis should be resolved')
    })

    it('can add proposals to the Organisation', async () => {
        proposalCost = await organisation.addProposal.estimateGas("Bring nectar", {})
        console.log('addProposal gas cost estimate : ', proposalCost);
        console.log("Proposal count Before pushing data: ",(await  organisation.proposalsCount()).toNumber())
        
        await organisation.addProposal('DevelopFluidCash');

        console.log("Proposal count after pushing data: ",(await  organisation.proposalsCount()).toNumber())

        //Doesn't show any result
        /*proposalsLibrary.ProposalAdded().watch((err, response) => {
        if (!error) console.log ("Watching ProposalAdded: ", response);
        else console.log ("Watching ProposalAdded error: ", error);
        })
        */ 
        //Seems that you need a return to the nested object to be catched
        //TypeError: Cannot read property 'filter' of undefined

        //console.log(proposalsLibrary.address)
        //event = await proposalsLibrary.logs.filter(x => x.event == 'ProposalAdded')[0].args.key
        //console.log(event)

        await organisation.addProposal('Develop MarketPlace');
        console.log("Proposal count after pushing data: ",(await  organisation.proposalsCount()).toNumber())
        console.log('[1][0] (key): ',(await  organisation.getProposal(1))[0])
        console.log('[1][1] (funds): ',(await  organisation.getProposal(1))[1].toNumber())
        console.log('[2][0] (key): ',(await  organisation.getProposal(2))[0])
        console.log('[2][0] (funds): ',(await  organisation.getProposal(2))[1].toNumber())
        

        await organisation.updateProposal(1, 'Develop MarketPlace');
        console.log('[1][0] (key): ',(await  organisation.getProposal(1))[0])
        console.log('[1][1] (funds): ',(await  organisation.getProposal(1))[1].toNumber())
        console.log("Proposal count after update data: ",(await  organisation.proposalsCount()).toNumber())

        fundingProposalCost = await organisation.fundProposal.estimateGas(1)
        console.log('fundProposal gas cost estimate : ', fundingProposalCost);
        await organisation.fundProposal(1, {from: owner, value: 100});
        console.log('[1][0] (key): ',(await  organisation.getProposal(1))[0])
        console.log('[1][1] (funds): ',(await  organisation.getProposal(1))[1].toNumber())        
        
        assert.equal((await  organisation.proposalsCount()).toNumber(), 2, 'One proposal should be added')
    })

    it('can generate tokens from the organisation', async () => {
        await organisation.generateTokens(1000);
       
        orgEtherBalance = await organisation.getBalance(organisation.address);
        //orgEtherBalanceOriginal = web3.eth.getBalance(organisation.address);
        assert.equal(orgEtherBalance, 1000, 'organisation should have 1000 tokens')
    })
    
    it('can upgrade and organisation', async () => {

        const OrganisationUpdated = getContract('OrganisationUpdated')
        parent.upgradeOrganisation('Xamedis');
        organisationFromParent = await parent.getOrganisation('Xamedis');
        organisationUpdated = await OrganisationUpdated.at(organisationFromParent)

        
        console.log('organisation upgraded addr: ', organisationUpdated.address)
        upgradedProposalCount = (await organisationUpdated.proposalsCount()).toNumber();
        console.log('Total proposals same quantity as previously updated: ', upgradedProposalCount)
        orgUpdatedEtherBalance = await organisationUpdated.getBalance(organisationUpdated.address);
        console.log('Total balance must be the same as previously updated: ', orgUpdatedEtherBalance)
        hasUpgradedCorrectly = await organisationUpdated.coolLogic.call();
        assert.equal(hasUpgradedCorrectly, true, 'Contract upgraded');
    })
    it('should implement contract ownership', async () => {
        
        const OrganisationUpdated = getContract('OrganisationUpdated')
        const Organisation = getContract('Organisation')
        const EternalStorage = getContract('EternalStorage')


        organisationFromParent = await parent.getOrganisation('Xamedis');
        organisation = await Organisation.at(organisationFromParent)
        organisationUpdated = await OrganisationUpdated.at(organisationFromParent)
        
        console.log('organisation addr: ', organisation.address);
        console.log('organisation updated addr: ', organisationUpdated.address);

        storageAddress = await organisation.eternalStorage()//.address
        storageAddressUpdated = await organisationUpdated.eternalStorage()//.address
        console.log('EternalStorage is at ', storageAddress);
        console.log('EternalStorage updated is at ', storageAddressUpdated);

        eternalStorage = await EternalStorage.at(storageAddressUpdated);
        console.log('EternalStorage owner is ', (await eternalStorage.owner.call()),' - organisationAddr the first one: ', organisationAddr , '- owner account: ', owner);
    })

})
