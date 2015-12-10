var path = require('path');

function history(req, res) {
  res.sendFile(path.resolve(__dirname + '/../../client/history.html'));
}

module.exports.historyPage = history;