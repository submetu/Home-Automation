function socketapp(server){
	var io   = require('socket.io').listen(server);
	var publish = require('../mqtt/publish');
	var subscribe = require('../mqtt/subscribe');
 	
	io.sockets.on('connection', function (socket) {  
	    console.log("Socket ID: " + socket.id);
	    console.log('Wating for inputs ...');
		// ledHandler(socket,inits.led,io.sockets);
		socket.on('led:on', function (data) {
		   publish('on', 'Turn on the light')
		   console.log('LED ON RECEIVED');
		});
		socket.on('led:off', function (data) {
			publish('off', 'Turn off the light')
		    console.log('LED OFF RECEIVED');
		});

	});
 	

}

module.exports = socketapp;