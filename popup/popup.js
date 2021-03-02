var bg = chrome.extension.getBackgroundPage();

var start_ele = document.getElementById("start")
var stop_ele = document.getElementById("stop")

start_ele.addEventListener("click",startSession)
stop_ele.addEventListener("click",stopSession)

function startSession(){
    bg.st_time = (new Date).getTime()
    console.log("session started")
}

function stopSession(){
    chrome.runtime.sendMessage("stopSession")
    console.log("session stopped")
}
