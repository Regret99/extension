function getwordHB(info,tab) {

    chrome.tabs.create({ 

        url: "http://hummingbird.me/search?query=" + info.selectionText,
    })


}

function getwordCR(info,tab) {

    chrome.tabs.create({ 

        url: "http://www.crunchyroll.com/search?q=" + info.selectionText,
    })


}

function getwordVN(info,tab) {

    chrome.tabs.create({ 

        url: "http://vndb.org/v/all?sq=" + info.selectionText,
    })


}

function getwordMAL(info,tab) {

    chrome.tabs.create({ 

        url: "http://myanimelist.net/anime.php?q=" + info.selectionText,
    })


}

function getwordANI(info,tab) {

    chrome.tabs.create({ 

        url: "http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search=" + info.selectionText,
    })


}



chrome.contextMenus.create({

    title: "Search VNDB: %s", 
    contexts:["selection"], 
    onclick: getwordVN,

})





