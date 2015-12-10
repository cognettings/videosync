var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('bower_components'));
app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/watch', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/watch.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});