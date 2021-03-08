var bg = chrome.extension.getBackgroundPage();

window.onload=function(){

    chrome.bookmarks.create({
        title:"ActivityTracker"
    },function(node){
        bg.parentid = node.id
        chrome.bookmarks.create({
            parentId:node.id,title:"Default"
        },function(defaultNode){
            bg.defaultid=defaultNode.id
            loadSessions()
        })
    })

    
    var view_ele = document.getElementById("view")
    var start_ele = document.getElementById("start")
    var add_btn = document.getElementById("add_new")
    
    view_ele.addEventListener("click",viewSession)
    start_ele.addEventListener("click",startSession)
    add_btn.addEventListener("click",addSesssion)

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
    ses = document.getElementById("sessions")
    bg.defaultid = ses.options[ses.selectedIndex].value
    const view_page = document.createElement("a")
    view_page.href="session_view.html"
    view_page.click()
}

function startSession(){
    bg.st_time = (new Date).getTime()
    bg.cur_page = 3
    ses = document.getElementById("sessions")
    bg.defaultid = ses.options[ses.selectedIndex].value
    const start_page = document.createElement("a")
    start_page.href="session_run.html"
    start_page.click()
}

function loadSessions(){
    sessions_ele = document.getElementById("sessions")
    sessions_ele.innerHTML=""
    var i=0
    chrome.bookmarks.getChildren(bg.parentid,function(sessions){
        for(item of sessions){
            if(item.title=="Default"){
                var new_ses = document.createElement("option")
                new_ses.text = item.title
                new_ses.value = item.id
                sessions_ele.add(new_ses,sessions_ele[i++])
                break;
            }
        }
        for(item of sessions){
            if(item.title!="Default"){
                var new_ses = document.createElement("option")
                new_ses.text = item.title
                new_ses.value = item.id
                sessions_ele.add(new_ses,sessions_ele[i++])
            }
        }
    })
}

function addSesssion(){
    var new_ses = (document.getElementById("new_session").value).toString()
    new_ses = new_ses.trim()
    msg = document.getElementById("addError")
    if(!new_ses){
        msg.innerHTML="Name cannot be empty!!"
        msg.style.color="red"
    }else{
        chrome.bookmarks.getChildren(bg.parentid,function(sessions){
            for(item of sessions){
                console.log(item.title)
                if(item.title==new_ses){
                    msg.innerHTML="session already exists."
                    msg.style.color="red"
                    return
                }
            }
        })
        chrome.bookmarks.create({
            parentId:bg.parentid,title:new_ses
        },function(){
            loadSessions()
        })
        msg.innerHTML="Session added Succesfully!!"
        msg.style.color="green"
    }
}