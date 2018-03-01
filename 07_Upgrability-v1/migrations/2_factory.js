
module.exports = async (deployer, network, accounts) => {

  const getContract = name => artifacts.require(name)

  const bases = ['TokenLedger', 'EternalStorage']
  const baseContracts = bases.map(getContract)

  await deployer.deploy(baseContracts)
  const baseDeployed = baseContracts.map(c => c.address)

  //Libraries
  const ProposalsLibrary = getContract('ProposalsLibrary')
  await deployer.deploy(ProposalsLibrary)

  const SecurityLibrary = getContract('SecurityLibrary')
  await deployer.deploy(SecurityLibrary)

  //Organization and Parent Contracts
  const Organisation = getContract('Organisation')
  const Parent = getContract('Parent')

  //Linking
  await deployer.link(ProposalsLibrary, [Organisation,Parent]);
  await deployer.link(SecurityLibrary, [Organisation,Parent]);

  //Organization
  //#########################################################################
  //function Organisation(address _tokenLedger, address _eternalStorage) {
  //#########################################################################
  await deployer.deploy(Organisation, baseDeployed[0], baseDeployed[1]) //...baseDeployed

  //Parent factory
  await deployer.deploy(Parent)

};

//Version de antes
//var DataVerifiable = artifacts.require('DataVerifiable');
//var EternalStorage = artifacts.require('EternalStorage');
//var Organisation = artifacts.require('Organisation');
//var OrganisationUpdated = artifacts.require('OrganisationUpdated');
//var Ownable = artifacts.require('Ownable');
//var Parent = artifacts.require('Parent');
//var ProposalsLibrary = artifacts.require('ProposalsLibrary');
//var SecurityLibrary = artifacts.require('SecurityLibrary');
//var TokenLedger = artifacts.require('TokenLedger');

  //deployer.deploy(DataVerifiable);
  //deployer.deploy(EternalStorage);
  //deployer.deploy(OrganisationUpdated);
  //deployer.deploy(Ownable);
  //deployer.deploy(TokenLedger);

  //Libraries
  //deployer.deploy(ProposalsLibrary);
  //deployer.deploy(SecurityLibrary);
  //According to http://truffleframework.com/docs/getting_started/migrations
  //deployer.link(ProposalsLibrary, [Organisation,Parent]);
  //deployer.link(SecurityLibrary,[Organisation,Parent]);
  //deployer.deploy(Organisation);
  //deployer.link(ProposalsLibrary, Parent);
  //deployer.link(SecurityLibrary, Parent);
  //deployer.deploy(Parent);