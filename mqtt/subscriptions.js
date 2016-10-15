var subscribe = require('./subscribe');

function subscriptions(io){
	var client = require('twilio')('AC873fc5fd2e38b3d29c682f07eb642dbc', '38ca41dd2ccf4fda8faeabd681a46c06');
	subscribe('outTopic',function(topic,message,packet){
		console.log('Message received: ' + message.toString() + " on topic " + topic);
		if(parseInt(message.toString()) > 24){
			//Send an SMS text message
			client.sendMessage({
			    to:'+905319410442', // Any number Twilio can deliver to
			    from: '+12564148289 ', // A number you bought from Twilio and can use for outbound communication
			    body: 'Sai garmi ho gai hai jani!' // body of the SMS message
			}, function(err, responseData) { //this function is executed when a response is received from Twilio

			    if (!err) { // "err" is an error received during the request, if any

			        // "responseData" is a JavaScript object containing data received from Twilio.
			        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
			        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

			        console.log(responseData.from); // outputs "+14506667788"
			        console.log(responseData.body); // outputs "word to your mother."
			    }
			});
		}
		io.emit('temperature',{temperature:message.toString()});
	});

	subscribe('pir',function(topic,message,packet){
		console.log('Message received: ' + message.toString() + " on topic " + topic);
		io.emit('pir',{moving:message.toString()});
	});
}

module.exports = subscriptions;