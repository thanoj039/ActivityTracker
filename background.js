console.log('Hello from background.js');
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
            console.log(historyItems)
        });

    }
});


