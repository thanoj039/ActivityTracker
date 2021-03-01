var bg = chrome.extension.getBackgroundPage();
var ele = document.getElementById("start")
if(bg.start){
    ele.innerHTML="Stop";
}else{
    ele.innerHTML="Start";
}

ele.addEventListener("click",sessionControl)

function sessionControl(){
    if(ele.innerHTML=="Start"){
        ele.innerHTML="Stop"
        bg.start=true
        bg.st_time = (new Date).getTime()
    }else{
        ele.innerHTML="Start"
        bg.start=false
        chrome.runtime.sendMessage("stopSession")
    }
}

