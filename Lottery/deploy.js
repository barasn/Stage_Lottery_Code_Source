const HDWalletProvider = require('truffle-hdwallet-provider'); // utilisation infura
const ethereumJs = require('web3');

const gara = require('./compile');

const mnemonic = 'furnace jump affair major journey bottom husband omit talent decrease frost enable';
const provider = new HDWalletProvider(mnemonic,'https://rinkeby.infura.io/v3/dabe351857bc4fb6a03ee75bb2c6cea8');

const web3 = new ethereumJs(provider);

const InterfaceLottery = JSON.parse(gara.interface); //ABI
const BytecodeLottery = gara.bytecode; // Bytecode

web3.setProvider(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(InterfaceLottery)
    .deploy({ data: BytecodeLottery})
    .send({gas:'1000000', from: accounts[0]});

  console.log(gara.interface);
  console.log('Contract deployed to', result.options.address);

};
deploy();
provider.engine.stop();
