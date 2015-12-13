// This page requires socket.io: <script src="/socket.io/socket.io.js"></script>

window.onload = init;
var socket;
var video;

function init() {
  video = document.querySelector('video');
  
  socket = io.connect();
  socket.on('msgVideoState', receiveVideoStateMessage);
}

function receiveVideoStateMessage(videoState) {
  video.currentTime = correctPlayTime(videoState.playTime, videoState.stateTime);
  
  if (videoState.isPlaying) {
    video.play();
  }
  else {
    video.pause();
  }
}

function correctPlayTime(playTime, stateTime) {
  // account for message travel time
  return playTime + (Date.now() - stateTime) / 1000.0;
}
