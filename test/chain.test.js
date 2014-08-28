require('chai').should();

var chainManager = require('../src/chainManager');


function mine_next_block(parent, uncles, coinbase, transactions) {
    uncles = uncles || [];
    coinbase = coinbase || null;
    transactions = transactions || [];

    # advance one block
    coinbase = coinbase || parent.coinbase;
    var m = new chainmanager.Miner(parent, uncles, coinbase);
    transactions.forEach(function(tx) {
        m.add_transaction(tx);
    }
    var blk = m.mine(Math.pow(1000, 2));
    //assert blk is not False, "Mining failed. Use mkquickgenesis!"
    return blk;
}


describe('chain', function(){
    it('mine block', function(){
    });
});
