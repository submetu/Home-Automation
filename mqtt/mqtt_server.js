var mqtt = require('mqtt')
var url  = require('url');

function mqttServer(callback){
	var client  = mqtt.connect({ host: '192.168.1.33', port: 1883 });
	// var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
	// var auth = (mqtt_url.auth || ':').split(':');
	// console.log(auth);
	//when the connection is created
	client.on('connect', function () {
	  //publish to everyone 
	  callback(null,client);
	  // client.publish('off', 'Turn off the light')
	  // client.subscribe('outTopic',msgReturn);
	});

}
module.exports = mqttServer;

 