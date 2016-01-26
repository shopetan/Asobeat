var PulseSensor = (function() {
  var rate = new Array(10);
  var sampleCounter = 0;
  var lastBeatTime = 0;
  var P = 1024;
  var T = 1024;
  var thresh = 1024;
  var amp = 100;
  var firstBeat = true;
  var secondBeat = false;
  var IBI = 600;
  var BPM = 0;
  var Pulse = false;
  var QS = false;

  var bpmCallback = null;
  var readCallback = null;

  var debug = false;

  var setBPMCallback = function(callback) {
      bpmCallback = callback;
  };

  var start = function(callback) {
    readCallback = callback;
    lastBeatTime = Date.now();
    update();
  };

  var update = function() {
    if(!readCallback)return;

    var data = readCallback();
    if(debug)pulsePrint(data);
    calcBeats(data);
    if(QS){
      if(!bpmCallback)return;
      bpmCallback(Math.round(BPM));
      QS = false;
    }

    setTimeout(update, 2);
  };

  var calcBeats = function(data) {
    var Signal = data;
   
    sampleCounter = Date.now();
    var N = sampleCounter - lastBeatTime;

    if(Signal < thresh && N > (IBI/5)*3){
      if (Signal < T){
        T = Signal;
      }
    }

    if(Signal > thresh && Signal > P){
      P = Signal;
    }

    if (N > 250){
      if ( (Signal > thresh) && (Pulse === false) && (N > (IBI/5)*3) ){
        Pulse = true;
        IBI = sampleCounter - lastBeatTime;
        lastBeatTime = sampleCounter;

        if(secondBeat){
          secondBeat = false;
          for(var i=0; i<=9; i++){
            rate[i] = IBI;
          }
        }

        if(firstBeat){
          firstBeat = false;
          secondBeat = true;
          return;
        }

        var runningTotal = 0;
        for(var i=0; i<=8; i++){
          rate[i] = rate[i+1];
          runningTotal += rate[i];
        }

        rate[9] = IBI;
        runningTotal += rate[9];
        runningTotal /= 10;
        BPM = 60000/runningTotal;
        QS = true;
      }
    }

    if (Signal < thresh && Pulse === true){
      Pulse = false;
      amp = P - T;
      thresh = amp/2 + T;
      P = thresh;
      T = thresh;
    }

    if (N > 2500){
      thresh = 1024;
      P = 1024;
      T = 1024;
      lastBeatTime = sampleCounter;
      firstBeat = true;
      secondBeat = false;
    }
  };

  var enableDebug = function() {
    debug = true;
  };

  var pulsePrint = function(data){
      var v = (function (value, low1, high1, low2, high2) {return low2 + (high2 - low2) * (value - low1) / (high1 - low1);})(data, 0, 2048, 0, 11);
      for(var i=0; i<v; i++)
        process.stdout.write('---');
      console.log();
  };

  return {
    start: start,
    setBPMCallback: setBPMCallback,
    enableDebug: enableDebug
  };
  
})();

module.exports = PulseSensor;

