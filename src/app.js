var express = require('express');
var path = require('path');
var app = express();
var router = require('./router.js');
var comms = require('./communication');

app.use(express.static('bower_components'));
app.use(express.static('client'));

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname + '/views'));

router(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
comms.setIO(io);