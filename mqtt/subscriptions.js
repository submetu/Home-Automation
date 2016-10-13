var subscribe = require('./subscribe');

function subscriptions(io){

	subscribe('outTopic',function(topic,message,packet){
		console.log('Message received: ' + message.toString() + " on topic " + topic);
		io.emit('temperature',{temperature:message.toString()});
	});

	subscribe('pir',function(topic,message,packet){
		console.log('Message received: ' + message.toString() + " on topic " + topic);
		io.emit('pir',{moving:message.toString()});
	});
}

module.exports = subscriptions;