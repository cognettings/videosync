var io;

function setIO(ioChannel) {
  io = ioChannel;
  
  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
}

module.exports = {
  setIO: setIO
};
