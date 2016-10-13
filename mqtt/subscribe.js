var mqttServer = require('./mqtt_server');

function subscribe(topic,callback){
	//get the 'client' variable from mqtt_server module
	mqttServer(function(err,client){
		client.subscribe(topic,function(){
		 	client.on('message', function (topic, message,packet) {
		 		callback(topic,message,packet)
			  	//add callback to give others access to topic,message,packet
		 	  	// console.log(packet);
			  	// console.log('The message "'+ message.toString() + '" came on the topic "'+ topic.toString()+'"');
			});
		});
	});
}

module.exports = subscribe;