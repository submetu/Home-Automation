var mqttServer = require('./mqtt_server');

function publish(topic,message){
	mqttServer(function(err,client){
		client.publish(topic,message);
	});
}

module.exports = publish;