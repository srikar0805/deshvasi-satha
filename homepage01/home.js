var myString = "Welcome to Desh Vasi Satha.";
var myArray = myString.split("");
var loopTimer;

function looper() {
  if(myArray.length > 0){
    document.getElementById("typingText").innerHTML += myArray.shift();
  } else {
    clearTimeout(loopTimer);
  }
  loopTimer = setTimeout('looper()', 100);
}
looper();

$(function(){
  $("#includedContent").load("navbar.html"); 
});