var util = require('./util');
var block = require('./block');
var BigInteger = require('./jsbn/jsbn');
var jspack = require('./vendor/jspack/jspack');

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


var TWO_POW_256 = BigInteger('2').pow(256);
Miner.prototype.mine = function(steps) {
    steps = steps || 1000;

    // ??
    //var nonce_bin_prefix = '\x00' * (32 - len(struct.pack('>q', 0)))

    var nonce_bin_prefix = util.repeat('\x00', 24);
    var target = TWO_POW_256.divide(this.block.difficulty);
    var rlp_Hn = this.block.serialize_header_without_nonce();

    var stopLoop = this.nonce.intValue() + steps;
    for (var nonce = this.nonce.intValue(); nonce < stopLoop; nonce++) {
        // TODO will we need to keep nonce as BigInteger?
        var nonce_bin = nonce_bin_prefix + jspack.pack('>q', nonce);
        // BE(SHA3(SHA3(RLP(Hn)) o n))
        var h = util.sha3(util.sha3(rlp_Hn) + nonce_bin);
        var l256 = util.bigEndianToInt(h);
        if (l256.compareTo(target) < 0) {
            this.block.nonce = nonce_bin;
//            assert self.block.check_proof_of_work(self.block.nonce) is True
//            assert self.block.get_parent()
//            logger.debug(
//                'Nonce found %d %r', nonce, self.block)
            return this.block;
        }
    }

    this.nonce = nonce;
    return false;
};

module.exports = {
    Miner: Miner
};
