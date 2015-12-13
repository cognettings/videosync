var state = require('./state.js');

function home(req, res) {
  res.render('home', {
    currentlyPlaying: state.getVideoInfo()
  });
  
}

module.exports.homePage = home;