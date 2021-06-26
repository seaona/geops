const GeoCashFlow = artifacts.require("GeoCashFlow");

let accounts;
let owner;

contract("GeoCashFlow", accts => {
    accounts = accts;
    owner = accounts[0];
    });

    
it('can start a stream', async() => {
    let instance = await GeoCashFlow.deployed();
    await instance.createStream(param1, param2, {from: accounts[0]});
    assert.equal(await instance.getActiveStreams.call(), createdStream);
});
