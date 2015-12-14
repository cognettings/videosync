var state = null; /*{
  isPlaying: false,
  playTime: 0,
  stateTime: Date.now()
};*/

function setState(newState) {
  state = newState;
}

function getState() {
  return state;
}

module.exports = {
  setVideoState: setState,
  getVideoState: getState
};