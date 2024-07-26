/* event listener to send message to content js for iframe toggle */
chrome.action.onClicked.addListener(async function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            todo: "toggle"
        },() => chrome.runtime.lastError);
    });
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === "open-steam-page") {
        chrome.tabs.query({ active:true, currentWindow:true },function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{
                command: "open-steam-page"
            },() => chrome.runtime.lastError);
        });      
    }
});

chrome.omnibox.onInputEntered.addListener((text) => {
    const newURL = 'https://store.steampowered.com/search/?term=' + encodeURIComponent(text);
    chrome.tabs.create({ url: newURL });
});


