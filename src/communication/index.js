var io;
var state = require('./state.js');

function setIO(ioChannel) {
  io = ioChannel;
  
  io.on('connection', function (socket) {
    socket.on('msgVideoState', function (data) {
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
    
    socket.on('msgVideoEnd', function() {
      io.sockets.emit('msgVideoEnd');
    });
  });
}

module.exports = {
  setIO: setIO
};
