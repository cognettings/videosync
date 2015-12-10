var path = require('path');

function watch(req, res) {
  res.sendFile(path.resolve(__dirname + '/../../client/watch.html'));
}

module.exports.watchPage = watch;