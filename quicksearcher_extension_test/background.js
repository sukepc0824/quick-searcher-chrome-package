chrome.action.onClicked.addListener(() => {
    // メッセージを送信
    chrome.tabs.query({ active: true, currentWindow: true }, (e) => {
        const url = e[0].url;
        if (!url.includes("chrome://")) {
            chrome.tabs.sendMessage(e[0].id, { name: "toggle" });
        }
    });
})
/*
chrome.tabs.onUpdated.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (e) => {
        const url = e[0].url;
        if (url === "chrome://newtab/" || url === "edge://newtab/") {
            chrome.tabs.update(
                undefined, {
                url: "https://youtube.com"
            }
            );
            //chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            //  chrome.tabs.sendMessage(tabs[0].id, { name: "show" });
            //});
        }
    });
})
*/

chrome.runtime.onMessage.addListener((message, sender) => {
    const tabId = sender.tab.id
    if (tabId) {
        chrome.tabs.sendMessage(tabId, {
            name: message.name
        })
    }
})


chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: "https://wispy-field-6339.spearly.app/help.html"
        });
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'open_launcher',
        title: 'QuickSearcher',
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'open_launcher') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { name: "open" });
        });
    }
});