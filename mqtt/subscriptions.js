var subscribe = require('./subscribe');

function subscriptions(io){
	var client = require('twilio')('AC873fc5fd2e38b3d29c682f07eb642dbc', '38ca41dd2ccf4fda8faeabd681a46c06');
	subscribe('outTopic',function(topic,message,packet){
		console.log('Message received: ' + message.toString() + " on topic " + topic);
		
		io.emit('temperature',{temperature:message.toString()});
	});

	// 
}

module.exports = subscriptions;