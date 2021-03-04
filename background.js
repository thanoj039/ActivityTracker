console.log('Hello from background.js');

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

    }
});

