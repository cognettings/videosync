var video = require('../model').video;
var _ = require('underscore');

// render history page with 10 recently played videos
function history(req, res) {
  video.videoModel.newestTen(_.partial(renderHistory, res, _, _));
}

function renderHistory(res, err, videos) {
  if (err) {
    res.status(500).send({ error: 'Error: mongoose - could not retrieve video records' });
    return;
  }
  
  res.render('history', {videos: videos || []});
}

module.exports.historyPage = history;