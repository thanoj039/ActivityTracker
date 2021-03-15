chrome.runtime.onInstalled.addListener(function(){
    alert("Activity Tracker succesfully installed.")

    var parentid = "1"
    var defaultid = "1"

    chrome.bookmarks.search({title:"ActivityTracker"},function(nodes){
        if(nodes){
            parentid=nodes[0].id
            chrome.bookmarks.getChildren(parentid,function(nodes){
                var found = 0
                for( i of nodes){
                    if(i.title=="Default"){
                        defaultid=i.id
                        found=1
                    }
                }
                if(found==0){
                    chrome.bookmarks.create({
                        parentId:parentid,title:"Default"
                    },function(defaultNode){
                        defaultid=defaultNode.id
                    })
                }
            })
        }else{
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
        }
    })
    
})

var st_time = (new Date).getTime()
var cur_page = 1

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

