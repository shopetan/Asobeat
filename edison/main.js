var bleno = require('bleno');
var mraa = require('mraa');
var pulse = require('./PulseSensor.js');

var motor = new mraa.Gpio(20);
motor.dir(mraa.DIR_OUT);

var beats = new mraa.I2c(1);
beats.address(0x68);
beats.writeReg(0x00, 0x80);

var bpm = 0;
var id;

var readi2c = function () {
  var rdy = 1;
  var buf = new Buffer(3);
  while(rdy){
    buf = beats.read(3);
    rdy = (buf[2] & 0x80) >>> 7;
  }
  buf[0] = buf[0] & 0x0f;
  return buf[0] * 0xff + buf[1];
  return 0;
}

pulse.setBPMCallback(function(data){bpm = data;});

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
  if (state === 'poweredOn') {
    bleno.startAdvertising('asobeatDevice', ['0001']);
    pulse.start(readi2c);
  } else {
    bleno.stopAdvertiseing();
  }
});

moterService = new bleno.PrimaryService( {
  uuid : '0001',
  characteristics : [
    new bleno.Characteristic( {
      uuid : '638599D442C245D8ADBAD24C7E35A369',
      properties : ['write','writeWithoutResponse'],
      onWriteRequest : function(data, offset, withoutResponse, callback) {
        motor.write(parseInt(data, 10));
        callback(bleno.Characteristic.RESULT_SUCCESS);
      }
    })
  ]
});

pulseService = new bleno.PrimaryService( {
  uuid : '0001',
  characteristics : [
    new bleno.Characteristic( {
      uuid : 'C6931E22F44F46358575830DD8C90FFD',
      properties : ['notify'],
      onSubscribe : function(maxValueSize, updateValueCallback) {
       id = setInterval(function() {
          var buff = new Buffer(1);
          buff[0] = bpm;
          updateValueCallback(buff);
        }, 1000);
      }
    })
  ]
});


bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'))
    if (!error) {
      bleno.setServices([moterService, pulseService]);
  }
});


bleno.on('servicesSet', function(error){
  if(!error)console.log("service ok");
});

bleno.on('disconnect', function(clientAddress){
  clearInterval(id);
});

