console.log('Hello from background.js');
var start=false;
var st_time = (new Date).getTime()
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
    if( request === "stopSession" )
    {
        var numRequestsOutstanding = 0;

        chrome.history.search({
            'text': '',              
            'startTime': st_time  
        },
        function(historyItems) {
            for (var i = 0; i < historyItems.length; ++i) {
                var url = historyItems[i].url;
                var processVisitsWithUrl = function(url) {
                    return function(visitItems) {
                        processVisits(url, visitItems);
                    };
                };
                chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
                numRequestsOutstanding++;
            }
        });


        var urlToCount = {};

        var processVisits = function(url, visitItems) {
            for (var i = 0, ie = visitItems.length; i < ie; ++i) {
                if (visitItems[i].transition != 'typed') {
                    continue;
                }

                if (!urlToCount[url]) {
                    urlToCount[url] = 0;
                }

                urlToCount[url]++;
            }

        }
        console.log(urlToCount)
    }
});


