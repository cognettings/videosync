var state = require('./state.js');

// render home page with currently playing video (if there is one)
function home(req, res) {
  res.render('home', {
    currentlyPlaying: state.getVideoInfo()
  });
  
}

module.exports.homePage = home;