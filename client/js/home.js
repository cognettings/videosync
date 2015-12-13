window.onload = init;

function init() {
  var btnWatch = document.querySelector('#btnWatch');
  btnWatch.onclick = sendVideoUrl;
  
  var lblVideoUrl = document.querySelector('#lblVideoUrl');
  lblVideoUrl.onkeypress = sendVideoUrl;
}

function sendVideoUrl(evt) {
  if (evt.type === 'keypress' && evt.keyCode != 13) {
      return;
  }
  
  var lblVideoUrl = document.querySelector('#lblVideoUrl');
  
  // todo validate url via XMLHttpRequest
  /*
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", "watch?videoUrl=" + lblVideoUrl.value, true);
  xhttp.send();
  */
  
  window.location = '/watch?videoUrl=' + lblVideoUrl.value;
}