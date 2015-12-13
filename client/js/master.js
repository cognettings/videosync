(function addMasterControls() {
  video = document.querySelector('video');
  
  if (video) {
    video.addEventListener('play', sendStateMessage);
    video.addEventListener('pause', sendStateMessage);
    video.addEventListener('seeked', sendStateMessage);
    video.addEventListener('end', sendEndMessage);
  }
})();  
  
function getVideoState() {  
  return {
    isPlaying: !video.paused,
    playTime: video.currentTime,
    stateTime: Date.now()
  };
}

function sendStateMessage() {
  console.log(getVideoState());
  socket.emit('msgVideoState', getVideoState());
}

function sendEndMessage() {
  socket.emit('msgVideoEnd');
}