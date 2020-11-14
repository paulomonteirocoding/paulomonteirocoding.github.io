function on() {
    //console.log(checkCookie("gdpr-acceptance"));
    if(checkCookie("gdpr-acceptance")){
        
    document.getElementById("gdpr-acceptance").style.display = "none";
    }else{
        document.getElementById("gdpr-acceptance").style.display = "flex";
    }
}
  
function off() {
    document.getElementById("gdpr-acceptance").style.display = "none";
    setGDPRCookie("GDPR-Acceptance");

}

function setGDPRCookie() {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "gdpr-acceptance = True ;" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log( c.substring(name.length, c.length));
      }
    }
    return "";
  }
  
  function checkCookie(cname) {
    var cookie = getCookie(cname);
    console.log(cookie);
    var cookiePair = cookie.split("=");
    if (cookie.indexOf("True")) {
      alert("GDPR is set to True");
      return true;
    } else if (cookie.indexOf("False")){
        alert("GDPR is set to false");
        return false;
      }else{
          
        alert("GDPR is not set");
      }
    }