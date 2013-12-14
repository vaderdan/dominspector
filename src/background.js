var height = 27;
var to;

chrome.extension.onMessage.addListener(function(message, sender, callback) {
    message.from = typeof sender.tab != "undefined" ? JSON.parse(JSON.stringify(sender.tab.id)) : 0;

    if (message.to == 'devtools') {
        return;
    }

    if (typeof message.to == 'undefined') {
        message.to = to;
    }

    to = message.to;




    chrome.tabs.sendMessage(message.to, message, function(r) {
        callback(r);
        return true;
    });




});


chrome.extension.onConnect.addListener(function(port) {
    //Posting back to Devtools
    chrome.extension.onMessage.addListener(function(message, sender) {
        console.log(message);

        if (message.to == 'devtools') {
            port.postMessage(message);
        }
    });
});


// port.onMessage.addListener(function(message) {
//     //Request a tab for sending needed information
//     chrome.tabs.query({
//         "status": "complete",
//         "currentWindow": true,
//         "url": "http://www.google.co.in/"
//     }, function(tabs) {
//         for (tab in tabs) {
//             //Sending Message to content scripts
//             chrome.tabs.sendMessage(tabs[tab].id, message);
//         }
//     });
// });



// chrome.contextMenus.create({
//     "title": "Buzz This",
//     "contexts": ["all", "page", "selection", "image", "link"],
//     "onclick": function() {

//     }
// });