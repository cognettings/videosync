(function addMasterControls() {
  video = document.querySelector('video');
  
  if (video) {
    video.addEventListener('play', sendStateMessage);
    video.addEventListener('pause', sendStateMessage);
    video.addEventListener('seeked', sendStateMessage);
    video.addEventListener('ended', sendEndMessage);
  }
})();  
  
function getVideoState() {  
  return {
    isPlaying: !video.paused,
    playTime: video.currentTime,
    stateTime: localToServerTime(Date.now())
  };
}

function sendStateMessage() {
  socket.emit('msgVideoState', getVideoState());
}

function sendEndMessage() {
  socket.emit('msgVideoEnd');
}