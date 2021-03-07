var bg = chrome.extension.getBackgroundPage();

window.onload=function(){   

    var back_ele = document.getElementById("back_btn")
    var open_ele = document.getElementById("openall")
    var del_ele = document.getElementById("delSes")

    back_ele.addEventListener("click",goBack)
    open_ele.addEventListener("click",openAll)
    del_ele.addEventListener("click",delSession)
    
    loadList()
}

var deleteFunc = function(){
    chrome.bookmarks.remove(this.id)
    loadList()
}

function goBack(){
    bg.cur_page=1
    const popup_page = document.createElement("a")
    popup_page.href="popup.html"
    popup_page.click()
}

function openAll(){
    var links = document.getElementsByTagName("a")
    for(link of links){
        chrome.tabs.create({url:link.href})
    }
}

function delSession(){
    chrome.runtime.sendMessage("deleteSession")
    goBack()
}

function getLI(node){
    var li = document.createElement("li")
    var btn = document.createElement("button")
    btn.id = node.id
    btn.innerHTML="<i class='fa fa-trash'></i>"
    btn.className="btn"
    btn.onclick=deleteFunc
    var a = document.createElement("a")
    a.href=node.url
    a.id="l"+node.id
    a.innerHTML=node.title
    a.target="_blank"
    li.appendChild(btn)
    li.appendChild(a)
    return li
}

function loadList(){
    chrome.bookmarks.getChildren(bg.defaultid,function(nodes){
        var list = document.getElementById("list")
        list.innerHTML=""
        for(i of nodes){
            list.appendChild(getLI(i))
        }
    })
}