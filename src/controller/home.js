var path = require('path');

function home(req, res) {
  res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
}

module.exports.homePage = home;