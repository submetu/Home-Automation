var mqtt = require('mqtt')
var url  = require('url');

function mqttServer(callback){
	var client  = mqtt.connect({ host: '192.168.1.43', port: 1883 });
	// var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
	// var auth = (mqtt_url.auth || ':').split(':');
	// console.log(auth);
	//when the connection is created
	client.on('connect', function () {
	  //log that connection was successful 
	  console.log('Connected to broker!');
	  callback(null,client);
	});
	client.on('error',function(err){
		console.log("Error in connecting to the broker!\n",err);
	})

}
module.exports = mqttServer;

 