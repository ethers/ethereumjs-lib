var suspend = require('suspend');

// db param has interface of leveldown API
// (https://github.com/rvagg/node-leveldown)
var Db = function(db) {
    this.db = db;
}

Db.prototype.get = function(key) {
    return this.db.get(key, suspend.resume());
}

Db.prototype.set = function(key, val) {
    return this.db.put(key, val, suspend.resume());
}

module.exports = {
    Db: Db
};