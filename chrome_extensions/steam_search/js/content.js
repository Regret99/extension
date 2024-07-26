"use strict";

const log = console.log.bind(document);
const isNull = value => value === null || value === undefined;
const currentUrl = location.href;
var MANGATITLE = '';

function createContainer(callback=''){
    var box = document.createElement('div');
    box.setAttribute("id","searchBoxContainer");
    document.body.insertAdjacentElement("beforeend",box);
    createOverlay();
    if(callback != ''){ callback(); }
}
createContainer(function() {
    hideBox();
    createTextBox(function(){
        var closeBtn = document.getElementById('closeSearchBox');
        if(closeBtn){
            closeBtn.addEventListener('click',hideBox);
        }
        $('#steamSearchTextBtn').click(function(){
            var search = 'god of war';
            search = $('#steamSearchText').val();
            if(search && search !=''){
                openSteamPage(search);
            }else{alert('Enter a Title to Search');}
        });
        $('#vndbSearchTextBtn').click(function(){
            var search = 'god of war';
            search = $('#steamSearchText').val();            
            if(search && search !=''){
                openVndbPage(search);
            }else{alert('Enter a Title to Search');}
        });
        document.getElementById("steamSearchText").addEventListener("keydown",function(event){
            if(event.key === "Enter"){
                var search = $('#steamSearchText').val();
                openSteamPage(search);
            }
        });
    });
});
function createTextBox(callback=''){
    var container = document.querySelector('#searchBoxContainer');
    container.innerHTML = `
    <div class="steam-search-box">
        <button class="steam-close-button" id="closeSearchBox">×</button>
        <div class="steam-search-text-box">
            <input type="text" id="steamSearchText" placeholder="Enter text" style="margin-right: 10px;">
            <div>
            <button type="submit" id="steamSearchTextBtn" style="paddingpadding:3px 10px;background-color: #4CAF50; color: white; border: none; cursor: pointer;">Steam</button><br>
            <button type="submit" id="vndbSearchTextBtn" style="margin-top:3px;padding:1px 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Vndb</button>
            </div>
        </div>
    </div> `
    if(callback != ''){ callback(); }
}
function hideBox(){
    $('#searchBoxContainer').addClass('d-none');
    $('.steam-search-overlay').addClass('d-none');
}
function showBox(){
    $('#searchBoxContainer').removeClass('d-none');
    $('.steam-search-overlay').removeClass('d-none');
    $('#steamSearchText').focus();
}
function toggle(){
    if(document.getElementById("searchBoxContainer").classList.contains('d-none')){
        showBox();
    }else{ hideBox(); }
}
chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.todo == "toggle") {
        toggle();
    }
});
function createOverlay() {
    var box = document.createElement('div');
    var container = document.querySelector("#searchBoxContainer");
    box.setAttribute("id","steamSearchOverlay");
    box.setAttribute("class","steam-search-overlay");
    container.insertAdjacentElement("beforeend",box);
}
function openSteamPage(search){
    hideBox();
    window.open('https://store.steampowered.com/search/?term='+search, '_blank');
}
function openVndbPage(search){
    hideBox();
    window.open('https://vndb.org/v?sq='+search, '_blank');
}

chrome.runtime.onMessage.addListener(function (msg) {    
    if (msg.command == "open-steam-page") {
      toggle();
}});

function isHentai3z(){
    if(currentUrl.includes("hentai3z.xyz")){
        var element = document.querySelector('.c-sub-header-nav.with-border');
        if(element){
            element.remove();
        }
        if(currentUrl.includes("/manga")){
            var title = element.getElementById('chapter-heading');
            if(title){
                MANGATITLE = title.innerText;
                copyTextToClipboard(MANGATITLE);
            }
        }
    }
}



document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        // copyTextToClipboard('tab?');
      }, 200);
    }
});
// copyTextToClipboard("somthing");
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard!",text);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

isHentai3z();
