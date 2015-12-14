var controllerState = require('../controller/state.js');

// helps clean up server if master has left the watch video area
function clearMasterSession(req, res, next) {
  if (req.session.isMaster) {
    req.session.destroy();
    controllerState.setVideoInfo(null);
    setTimeout(next, 1000);
  }
  else {
    next();
  }
}

module.exports.clearMasterSession = clearMasterSession;