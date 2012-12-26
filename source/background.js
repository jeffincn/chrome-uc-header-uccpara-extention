chrome.webRequest.onBeforeSendHeaders.addListener(

function(details) {
    var headers = details.requestHeaders,
        modifiedHeaders = {};
    var uccpara_string = localStorage['uccpara_string'];
    if (!uccpara_string) {
        uccpara_string = '';
    }
    var ucweb_simulate_status = localStorage['ucweb_simulate_status'];
    if (ucweb_simulate_status && ucweb_simulate_status.match(/enable/i)) {
        headers.push({
            name: 'User-Agent',
            value: 'uzone_monitor'
        });
        headers.push({
            name: 'uccpara',
            value: uccpara_string
        });
        headers.push({
            name: 'Accept:',
            value: 'text/html,application/xhtml+xml,application/xml;application/vnd.wap.xhtml+xml; q=0.9,*/*;q=0.8'
        });
    }
    modifiedHeaders.requestHeaders = headers;
    return modifiedHeaders;
}, {
    urls: []
}, ['requestHeaders', 'blocking']);
chrome.webRequest.onHeadersReceived.addListener(function(details) {
    var headers = details.responseHeaders,
        modifiedHeaders = {};
    for (i in headers) {
        if (headers[i]['name'] === 'Content-Type' && headers[i]['value'] === 'application/vnd.wap.xhtml+xml') {
            headers[i]['value'] = 'text/html';
            break;
        }
    }
    modifiedHeaders.responseHeaders = headers;
    return modifiedHeaders;
}, {
    urls: []
}, ['responseHeaders', 'blocking']);

badgeStatus();

function badgeStatus() {
    var badgeBackgroundColor = [255, 0, 0, 200];
    var badgeText = ' ';
    var ucweb_simulate_status = localStorage['ucweb_simulate_status'];
    if (ucweb_simulate_status && ucweb_simulate_status.match(/enable/i)) {
        badgeBackgroundColor = [0, 189, 57, 200];
        badgeText = '►';
    }
    chrome.browserAction.setBadgeText({
        'text': badgeText
    });
    chrome.browserAction.setBadgeBackgroundColor({
        'color': badgeBackgroundColor
    });
}
//chrome.webRequest.onSendHeaders.addListener(
//    function(details){
//        console.log(details.requestHeaders);
//    },
//    {urls:[]},
//    ["requestHeaders","blocking"]
//);
