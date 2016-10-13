var $on = $('#on');
var $off    = $('#off');
var $slider = $('#inputSlider');
var $sliderValue = $('#inputSliderValue');
var $lightTime = $('#lightTime');
var $tempField = $('#temperature-field');
var $pirField  = $('#pir-field');

var socket = io.connect();
 

$on.click(function(){
	socket.emit('led:on');
});

$off.click(function(){
	socket.emit('led:off');
});
socket.on('temperature',function(data){
	var date = new Date();
	$tempField.text(data.temperature+"°C @ "+ date.getHours() + ":" + date.getMinutes() + " hours");
});
socket.on('pir',function(data){
	$pirField.text(data.moving);
});
// function showValue(value){
// 	socket.emit('led:change',{value:value});
// }

// $slider.on('change',function(){
// 	var newVal = $(this).val();
// 	socket.emit('led:change',{value:newVal});
// });
// socket.on('led:change',function(data){
// 	console.log("the data returned is "+ data.value);
// 	$slider.val(data.value);
// 	$sliderValue.text(data.value);
// 	// socket.emit('led:change',{value:data.value});
// });
// //when there is a lightChange event fired from the light-handler
// socket.on('led:lightChange',function(data){
// 	console.log("the data returned is "+ data.value);
// 	$slider.val(data.value);
// 	$sliderValue.text(data.value);
// 	$lightTime.text(data.time);
// 	socket.emit('led:lightChange',{value:data.value});
// });
// socket.on('temperature',function(data){
// 	$tempField.text(data.value+" °C");
// });