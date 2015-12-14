var io;
var state = require('./state.js');
var controllerState = require('../controller/state.js');

var masterId;

// set up socket connections
function setIO(ioChannel) {
  io = ioChannel;
  
  io.on('connection', function (socket) {
    // set socket as the master controller
    if (!masterId && controllerState.getVideoInfo()) {
      masterId = socket.id;
    }
    
    // inform client of server time
    socket.emit('msgServerTime', Date.now());
    
    // tell new comers of the video state
    var videoState = state.getVideoState();
    if (videoState) {
      socket.emit('msgVideoState', videoState);
    }
    
    // whenever master changes video state, inform clients of state change
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
    
    // if master disconnects then destroy video and redirect clients to home page
    socket.on('disconnect', function() {
      if (this.id === masterId) {
        endVideo();
      }
    });
    
    // when video ends, reset server state and redirect clients to home page
    socket.on('msgVideoEnd', function() {
      endVideo();
    });
  });
}

// reset server video state info and inform clients that video has ended
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
