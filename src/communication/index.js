var io;
var state = require('./state.js');
var controllerState = require('../controller/state.js');

var masterId;

function setIO(ioChannel) {
  io = ioChannel;
  
  io.on('connection', function (socket) {
    if (!masterId && controllerState.getVideoInfo()) {
      masterId = socket.id;
    }
    
    socket.emit('msgServerTime', Date.now());
    
    socket.on('msgVideoState', function (data) {
      masterId = this.id;
      /*
      data = {
        isPlaying: bool,
        playTime: Number,
        msgTime: Date
      }
      */
      state.setVideoState(data);
      socket.broadcast.emit('msgVideoState', state.getVideoState());
    });
    
    socket.on('disconnect', function() {
      if (this.id === masterId) {
        endVideo();
      }
    });
    
    socket.on('msgVideoEnd', function() {
      endVideo();
    });
  });
}

function endVideo() {
  controllerState.setVideoInfo(null);
  masterId = null;
  io.sockets.emit('msgVideoEnd');
}

function sendVideoReadyMessage() {
  io.sockets.emit('msgVideoReady');
}

module.exports = {
  setIO: setIO,
  sendVideoReadyMessage: sendVideoReadyMessage
};
