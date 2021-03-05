var bg = chrome.extension.getBackgroundPage();

var back_ele = document.getElementById("back_btn")
var open_ele = document.getElementById("openall")
var del_ele = document.getElementById("delSes")

back_ele.addEventListener("click",goBack)
open_ele.addEventListener("click",openAll)
del_ele.addEventListener("click",delSession)

function goBack(){
    bg.cur_page=1
    const popup_page = document.createElement("a")
    popup_page.href="popup.html"
    popup_page.click()
}

function openAll(){
    
    console.log("code to open all links in new tabs.")

}

function delSession(){
    chrome.runtime.sendMessage("deleteSession")
    goBack()
}

