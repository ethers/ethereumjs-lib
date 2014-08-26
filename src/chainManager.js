var util = require('./util');
var block = require('./block');
var BigInteger = require('./jsbn/jsbn');

var Miner = function(opts) {
    var parent = opts.parent;
    var uncles = opts.uncles;
    var coinbase = opts.coinbase;

    uncles = uncles.map(function(u) {
        return u.list_header();
    });

    this.nonce = BigInteger.ZERO;
    this.block = block.Block.init_from_parent({
        parent: parent,
        coinbase: coinbase,
        uncles: uncles
    });
    this.pre_finalize_state_root = this.block.state_root();
    this.block.finalize();
//    logger.debug('Mining #%d %s', self.block.number, self.block.hex_hash())
//    logger.debug('Difficulty %s', self.block.difficulty)
};

module.exports = {
    Miner: Miner
};
