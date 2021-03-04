var bg = chrome.extension.getBackgroundPage();

window.onload=function(){
    loadSessions()
    var view_ele = document.getElementById("view")
    var start_ele = document.getElementById("start")
    
    view_ele.addEventListener("click",viewSession)
    start_ele.addEventListener("click",startSession)

}

if(bg.cur_page==2){
    const view_page = document.createElement("a")
    view_page.href="session_view.html"
    view_page.click()
}else{
    if(bg.cur_page==3){
        const start_page = document.createElement("a")
        start_page.href="session_run.html"
        start_page.click()
    }
}

function viewSession(){
    bg.cur_page = 2
    const view_page = document.createElement("a")
    view_page.href="session_view.html"
    view_page.click()
    console.log("session details displayed.")
}

function startSession(){
    bg.st_time = (new Date).getTime()
    bg.cur_page = 3
    const start_page = document.createElement("a")
    start_page.href="session_run.html"
    start_page.click()
    console.log("session started")
}

function loadSessions(){
    sessions_ele = document.getElementById("sessions")
    var i=0
    chrome.bookmarks.getChildren(bg.parentid,function(sessions){
        for(item of sessions){
            var new_ses = document.createElement("option")
            new_ses.text = item.title
            new_ses.value = item.id
            sessions_ele.add(new_ses,sessions_ele[i++])
        }
    })
}
