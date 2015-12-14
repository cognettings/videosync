// This page requires socket.io: <script src="/socket.io/socket.io.js"></script>
'use strict'

window.onload = init;
var socket;
var video;
var clientServerTimeDifference;

function init() {
  video = document.querySelector('video');
  
  socket = io.connect();
  socket.on('msgServerTime', receiveServerTimeMessage);
  socket.on('msgVideoEnd', receiveVideoEndMessage);
  socket.on('msgVideoState', receiveVideoStateMessage);
  socket.on('msgVideoReady', receiveVideoReadyMessage);
}

function receiveVideoEndMessage() {
  window.location = '/';
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
  return playTime + (Date.now() - serverToLocalTime(stateTime)) / 1000.0;
}

function serverToLocalTime(serverTime) {
  return serverTime - clientServerTimeDifference;
}

function localToServerTime(localTime) {
  return localTime + clientServerTimeDifference;
}

function receiveServerTimeMessage(time) {
  clientServerTimeDifference = time - Date.now();
}

// Refreshes the page to load the video that just started playing.
function receiveVideoReadyMessage() {
  history.go(0);
}