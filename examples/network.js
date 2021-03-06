var Network = require('../lib/network');
var network = new Network();

network.on('message', function(payload){
   // console.log(payload);
});

network.on('message.hello', function(hello, payload){
    console.log("hello from:" + hello.clientId);
    console.log("at:" + hello.ip + " port:" + hello.port);
});

network.on('message.ping', function(){
    console.log('been pinged');
});

network.on('message.pong', function(){
    console.log('got a pong');
});

network.on('message.getPeers', function(){
    console.log('request to send peers');
});

network.on('message.peers', function(){
    console.log('got peers');
});

network.on('message.transaction', function(){
    console.log('got a transaction');
});

network.on('message.blocks', function(){
    console.log('got a block');
});

network.on('message.getChain', function(){
    console.log("get chian");
});

network.on('message.notInChain', function(){
    console.log('got not in chain');
});

network.on('message.getTransactions', function(){
    console.log('request for transactions');
});

network.listen(30303, "0.0.0.0");
