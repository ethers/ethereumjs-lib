require('chai').should();

var chainManager = require('../src/chainManager');
var block = require('../src/block');
var BigInteger = require('../src/jsbn/jsbn');
var util = require('../src/util');


function mine_next_block(parent, uncles, coinbase, transactions) {
    uncles = uncles || [];
    coinbase = coinbase || null;
    transactions = transactions || [];

    // advance one block
    coinbase = coinbase || parent.coinbase;
    var m = new chainmanager.Miner(parent, uncles, coinbase);
    transactions.forEach(function(tx) {
        m.add_transaction(tx);
    });
    var blk = m.mine(Math.pow(1000, 2));
    //assert blk is not False, "Mining failed. Use mkquickgenesis!"
    return blk;
}

function accounts() {
    var k = util.sha3('cow');
    var v = util.privtoaddr(k);
    var k2 = util.sha3('horse');
    var v2 = util.privToAddr(k2);
    return {
        k: k,
        v: v,
        k2: k2,
        v2: v2
    };
}

function mkquickgenesis(initial_alloc) {
    // set INITIAL_DIFFICULTY to a value that is quickly minable
    return block.genesis(initial_alloc, BigInteger('2').pow(16));
}

describe('chain', function(){
    it.skip('mine block', function(){
        var acc = accounts();
        var k = acc.k, v = acc.v, k2 = acc.k2, v2 = acc.v2;
//        set_db()
        var blk = mkquickgenesis({v: util.denoms.ether});
//        db_store(blk)
        var blk2 = mine_next_block(blk, [], v);
//        db_store(blk2)
//        assert blk2.get_balance(v) == blocks.BLOCK_REWARD + blk.get_balance(v)
//        assert blk.state.db.db == blk2.state.db.db
//        assert blk2.get_parent() == blk
    });
});
