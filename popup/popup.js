var bg = chrome.extension.getBackgroundPage();

window.onload=function(){

    chrome.bookmarks.search({title:"ActivityTracker"},function(nodes){
        if(nodes){
            bg.parentid=nodes[0].id
            chrome.bookmarks.getChildren(bg.parentid,function(nodes){
                var found = 0
                for( i of nodes){
                    if(i.title=="Default"){
                        bg.defaultid=i.id
                        found=1
                    }
                }
                if(found==0){
                    chrome.bookmarks.create({
                        parentId:bg.parentid,title:"Default"
                    },function(defaultNode){
                        bg.defaultid=defaultNode.id
                        loadSessions()
                    })
                }
            })
        }else{
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
        }
        loadSessions()
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
        var present=0
        chrome.bookmarks.getChildren(bg.parentid,function(sessions){
            for(item of sessions){
                if(item.title==new_ses){
                    msg.innerHTML="session already exists."
                    msg.style.color="red"
                    present=1
                }
            }
            if(present==0){
                chrome.bookmarks.create({
                    parentId:bg.parentid,title:new_ses
                },function(){
                    loadSessions()
                })
                msg.innerHTML="Session added Succesfully!!"
                msg.style.color="green"
            }
        })
    }
}