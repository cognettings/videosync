var secondsToHHMMSS = require('../util').secondsToHHMMSS;
var url = require('url');
var ytdl = require('ytdl-core');
var _ = require('underscore');
var state = require('./state.js');
var video = require('../model').video;

function watch(req, res) {
  var query = url.parse(req.url, true).query;
  
  if (query.videoUrl) {
    if (state.getVideoInfo()) {
      // shouldn't be here
    }
    else {
      // Get info from youtube, set info on server, render page with info to client
      //getInfo(query.videoUrl, _.partial(setInfo, _, _.partial(res.render, 'watch')));
      getInfo(query.videoUrl, _.partial(setInfo, _, res));
    }
  }
  else {
    res.render('watch', {
      currentlyPlaying: state.getVideoInfo()
    });
  }
}

function getInfo(url, callback) {
  ytdl.getInfo(url, function gotInfo(err, info) {
    if (err) {
      // todo send error to client?
    }
    else {
      var extractedInfo = {
        thumbnail: info.iurlmq,
        author: info.author,
        title: info.title,
        id: info.video_id,
        duration: secondsToHHMMSS(info.length_seconds),
        youtubeUrl: info.loaderUrl,
        videoUrl: info.formats[0].url
      };
      
      callback(extractedInfo);
    }
  });
}

function setInfo(info, res) {
  state.setVideoInfo(info);
  saveInfo(info);
  
  var pageData = {
    currentlyPlaying: info,
    isMaster: true
  };
  
  res.render('watch', pageData);
}

function saveInfo(info) {
  var videoInfo = {
    thumbnail: info.thumbnail,
    author: info.author,
    title: info.title,
    duration: info.duration,
    youtubeUrl: info.youtubeUrl
  };
  
  new video.videoModel(videoInfo).save(function savedResult(err) {
    if (err) {
      // todo do something with error
      return;
    }
    
    console.log('video has been saved');
  });
}

module.exports.watchPage = watch;
