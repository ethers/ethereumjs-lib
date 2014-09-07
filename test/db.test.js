require('chai').should();

var suspend = require('suspend'),
    level = require('level-browserify'),
    Database = require('../src/db').Db;

describe('#database', function(){
    it('should put and get', function(done){
        suspend.run(function*() {
            var db = new Database(level('jtestdb'));
            yield db.set('n2', 'v2');
            var v2 = yield db.get('n2');
            v2.should.equal('v2');
        }, done)
    });
});

