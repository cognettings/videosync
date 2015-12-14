'use strict'

window.onload = init;

function init() {
  var btnWatch = document.querySelector('#btnWatch');
  btnWatch.onclick = sendVideoUrl;
  
  var lblVideoUrl = document.querySelector('#lblVideoUrl');
  lblVideoUrl.onkeypress = sendVideoUrl;
}

// Validate the url then redirect the client to the watch page.
function sendVideoUrl(evt) {
  hideError();
  
  // Allow user to press enter to submit request.
  if (evt.type === 'keypress' && evt.keyCode != 13) {
      return;
  }
  
  var lblVideoUrl = document.querySelector('#lblVideoUrl');
  
  // Validate the video url request.
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var result = JSON.parse(xhttp.responseText);
      
      if (result.err) {
        showError(result.err);
      }
      else {
        window.location = '/watch?videoUrl=' + lblVideoUrl.value;
      }
    }
    else if(xhttp.readyState == 4 && xhttp.status != 200) {
      showError('A problem occur on the server.');
    }
  };
  xhttp.open("GET", "validateUrl?videoUrl=" + lblVideoUrl.value, true);
  xhttp.send();
}

// Shows an error message on the page.
function showError(msg) {
  var lblError = document.querySelector('#lblError');
  lblError.innerHTML = 'Error: ' + msg;
  lblError.hidden = false;
}

// Hides the error div.
function hideError() {
  var lblError = document.querySelector('#lblError');
  lblError.hidden = true;
}