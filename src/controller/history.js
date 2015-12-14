var video = require('../model').video;
var _ = require('underscore');

function history(req, res) {
  video.videoModel.all(_.partial(renderHistory, res, _, _));
}

function renderHistory(res, err, videos) {
  if (err) {
    // todo deal with error - redirect to 500
    return;
  }
  
  res.render('history', {videos: videos || []});
}

module.exports.historyPage = history;