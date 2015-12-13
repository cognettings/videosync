// This page requires socket.io: <script src="/socket.io/socket.io.js"></script>

window.onload = init;

function init() {
  var socket = io.connect();
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}