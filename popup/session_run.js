var bg = chrome.extension.getBackgroundPage();

var stop_ele = document.getElementById("stop")
var cancel_ele = document.getElementById("cancel")

stop_ele.addEventListener("click",stopSession)
cancel_ele.addEventListener("click",goBack)

function goBack(){
    bg.cur_page=1
    const popup_page = document.createElement("a")
    popup_page.href="popup.html"
    popup_page.click()
}

function stopSession(){
    chrome.runtime.sendMessage("stopSession")
    goBack()
    console.log("session stopped and saved")
}
