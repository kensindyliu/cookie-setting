'use strict';
function onEvent(event, selector, callback){
return selector.addEventListener(event, callback);
}

function select(selector){
return document.querySelector(selector);
}

function create(element){
return document.createElement(element);
}

const btnAccept = select('#btnAccept');
const btnSetting = select('#btnSetting');
const btnSaveChanges = select('#btnSaveChanges');

const dvAcceptAll = select('#dvAcceptAll');
const dvSetting = select('#dvSetting');
const dialog = select('.dialog');

const chkBrowser = select('#chkBrowser');
chkBrowser.checked = true;
const chkOs = select('#chkOs');
chkOs.checked = true;       
const chkScreenWidth = select('#chkScreenWidth');
chkScreenWidth.checked = true;
const chkScreenHeight = select('#chkScreenHeight');
chkScreenHeight.checked = true;

onEvent('click', btnSetting, cookieSetting)
function cookieSetting() {
    dvAcceptAll.style.display = 'none';
    dvSetting.style.display = 'grid';
}

onEvent('click', btnAccept, saveCookies);
onEvent('click', btnSaveChanges, saveCookies)
function saveCookies(){
    setCookie('Browser', chkBrowser.checked?'Agreed':'Rejected', 15);
    setCookie('Operating system', chkOs.checked?'Agreed':'Rejected', 15);
    setCookie('Screen width', chkScreenWidth.checked?'Agreed':'Rejected', 15);
    setCookie('Screen height', chkScreenHeight.checked?'Agreed':'Rejected', 15);
    dialog.style.display ='none';
    // printCookies();
}
 
function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000)); // Corrected to use the seconds argument
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict;`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null; 
}

checkCookies();
function checkCookies(){
    let browser = getCookie('Browser');
    let os = getCookie('Operating system');
    let screenWidth = getCookie('Screen width');
    let screenHeight = getCookie('Screen height');
    if(!isNull(browser) || !isNull(os) || !isNull(screenWidth) || !isNull(screenHeight)){
        dialog.style.display = 'grid'; 
    }
}

function isNull(value){
    return value === null || value === '';
}

// function printCookies(){
//     let browser = getCookie('Browser');
//     let os = getCookie('Operating system');
//     let screenWidth = getCookie('Screen width');
//     let screenHeight = getCookie('Screen height');
//     console.log(browser, os, screenWidth, screenHeight);
// }