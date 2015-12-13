var secondsToHHMMSS = require('../util').secondsToHHMMSS;
var url = require('url');

var ytdl = require('ytdl-core');
var videoInfo;

function watch(req, res) {
  var sampleData = {
    thumbnail: 'https://i.ytimg.com/vi/Qe2Lcono0ms/mqdefault.jpg',
    author: 'Nam Cuong',
    title: 'Godzilla\'s Day Off',
    id: 'Qe2Lcono0ms',
    duration: '82',
    youtubeUrl: 'https://www.youtube.com/watch?v=Qe2Lcono0ms',
    videoUrl: 'https://r13---sn-ab5l6n7k.googlevideo.com/videoplayback?lmt=1362078929719534&dur=81.130&ratebypass=yes&sver=3&mn=sn-ab5l6n7k&initcwndbps=1385000&signature=080491C01FCFB19A3C53367DF072C9EBFD40C57E.7DBACD8F428AF42CCF9D4FF533F2172AF15BB942&upn=txLxx1op2ok&expire=1449791987&mime=video%2Fmp4&key=yt6&mt=1449770220&mv=m&ms=au&pl=17&id=o-AJlzE1uP32GnenLeMNM143YkW_YBLVUnZSIjosuwMcu9&ipbits=0&ip=67.247.128.171&mm=31&itag=22&fexp=9416126%2C9417097%2C9417353%2C9418199%2C9420452%2C9421931%2C9422596%2C9423244%2C9423572%2C9423662%2C9424861%2C9425113%2C9425200%2C9425670&requiressl=yes&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&source=youtube'
  };

  sampleData.duration = secondsToHHMMSS(sampleData.duration);
  
  //res.render('watch');
  
  res.render('watch', {
    currentlyPlaying: videoInfo,
    isMaster: true
  });
  
}

function setVideo(req, res, next) {
  var query = url.parse(req.url, true).query;
  
  // todo don't continue if there's already a video playing
  if (query.videoUrl === undefined) {
    next();
  }
  
  function extractInfo(err, info) {
	if (err) {
		console.log(err);
        // todo print error to client
		return;
	}

	var extract = {
		thumbnail: info.iurlmq,
		author: info.author,
		title: info.title,
		id: info.video_id,
		duration: secondsToHHMMSS(info.length_seconds),
		youtubeUrl: info.loaderUrl,
		videoUrl: info.formats[0].url
	};

    videoInfo = extract;
    console.log(videoInfo);
    next();
  } 
  
  ytdl.getInfo(query.videoUrl, extractInfo);
}
module.exports.watchPage = watch;
module.exports.setVideo = setVideo;