chrome.runtime.onInstalled.addListener(function(){
    alert("Activity Tracker succesfully installed. please don't modify the ActivityTracker folder in your bookmarks.")
})

var st_time = (new Date).getTime()
var cur_page = 1
var parentid = "1"
var defaultid = "1"

chrome.bookmarks.create({
    title:"ActivityTracker"
},function(node){
    parentid = node.id
    chrome.bookmarks.create({
        parentId:node.id,title:"Default"
    },function(defaultNode){
        defaultid=defaultNode.id
    })
})


chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
    if( request === "stopSession" )
    {
        chrome.history.search({
            'text': '',              
            'startTime': st_time  
        },
        function(historyItems) {
            for(item of historyItems){
                chrome.bookmarks.create({
                    parentId:defaultid,
                    title:item.title,
                    url:item.url
                })
            }
        });

    }else if(request == "deleteSession"){
        chrome.bookmarks.get(defaultid,function(nodes){
            if(nodes[0].title=="Default"){
                chrome.bookmarks.getChildren(defaultid,function(nodes){
                    for(node of nodes){
                        chrome.bookmarks.remove(node.id)
                    }
                })
            }else{
                chrome.bookmarks.removeTree(defaultid)
            }
        })
    }else{
        console.log("Do nothing")
    }
});

