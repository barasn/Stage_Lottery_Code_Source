const assert = require('assert');
const ganache = require('ganache-cli');
const ethereumJs = require('web3');
const provider = ganache.provider();

const demo = require('../compile');
const web3 = new ethereumJs(provider);
//const web3 = new ethereumJs('http://localhost:8545');


const LotteryInterface = JSON.parse(demo.interface);
const LotteryBytecode = demo.bytecode;

let accounts;
let lottery;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(LotteryInterface)
    .deploy({ data: LotteryBytecode })
    .send( {from: accounts[0], gas: '1000000'});


    lottery.setProvider(provider);
});

describe('Lottery Contract', () => {
  it('deplays a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    for (let i = 0; i < 3; i++) {
      await lottery.methods.enter().send({
        from: accounts[i],
        value: web3.utils.toWei('0.02', 'ether')
      });
      const players = await lottery.methods.getPlayers().call({
        from: accounts[i]
      });
      assert.equal(accounts[i], players[i]);
      //assert.equal(3, players.length);
    };
  });

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it('sends money to the winner and resets the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

  });



});
