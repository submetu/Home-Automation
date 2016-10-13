function socketapp(server){
	var io   = require('socket.io').listen(server);
	var publish = require('../mqtt/publish');
	var subscribe = require('../mqtt/subscribe');
	var subscriptions = require('../mqtt/subscriptions');
 	
	io.sockets.on('connection', function (socket) { 
		//add 'subscriptions.js' file to 'mqtt' folder and subscribe to everything required there
		//call the function of subscriptions.js here and pass on 'io.sockets'\
		//then use io.socket events in subscribe.js file to trigger listeners on the client side app.js
		//In subscriptions.js publish.js can also be called to publish counter events to all the clients
		subscriptions(io.sockets);
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