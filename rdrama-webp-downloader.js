// ==UserScript==
// @name        rdrama.net webp downloader
// @namespace   sneed's feed and seed
// @include     https://rdrama.net/*
// @include     https://pcmemes.net/*
// @grant       none
// @version     0.1
// @author      @geese_suck
// @description download your marseys with the correct file extension :)
// ==/UserScript==

//create the ghetto fake menu
function createMenu(id){
    var newmenu = document.createElement("DIV");
    var menuoption = document.createElement("P");
    var qwerty = document.createTextNode("DOWNLOAD WEBP");

    menuoption.appendChild(qwerty);
    menuoption.style.margin = "10px";
    newmenu.appendChild(menuoption);

    newmenu.style.display = "none";
    newmenu.style.position = "absolute";
    newmenu.style.border = "solid white";
    newmenu.style.backgroundColor = "black";
    newmenu.style.margin = "10px";
    newmenu.style.zIndex = "9999";
    newmenu.id = id;

    document.body.insertBefore(newmenu, document.getElementsByClassName("container")[0]);
}

function showMenu(e, id){
    ghjk = document.getElementById(id)
    ghjk.style.display = "block";
    ghjk.style.left = (e.pageX+250) + "px"; 
    ghjk.style.top = e.pageY + "px"; 
}

function hideMenu(id){
    document.getElementById(id).style.display = "none";
}


function checkIfImage(e, id){
    //images are underneath links fsr
    let asdf = document.activeElement;
    let picture = asdf.firstElementChild;

    if (picture.tagName == "IMG"){
        //split the url by slashes and get the last element which will be filename.webp or some shit
        //then split it again by period to get rid of whatever file extension it has so we can add our own
        let uri = picture.getAttributeNode("src").value;
        let filename = uri.split("/").pop().split(".")[0];
        
        setFile(uri, filename);
        showMenu(e, id);
    }
}

function downloadPic(id){
    let file = getFile();
    let uri = file[0], filename = file[1];
  
    //some ajax bullshit i stole off stackexchange or some other site i dont really remember where it came from but it works
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {
            let blob = new Blob([this.response], {type: 'image/webp'});
       
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob)
            a.download = filename+".webp"
            a.click()
        }
    }

    xhr.send();
    hideMenu(id);
}

function setFile(uri, filename){
    globalUri = uri;
    globalFilename = filename;
}

function getFile(){
    return [globalUri, globalFilename];
}

const menuId = "web-pee";
var globalUri;
var globalFilename;

createMenu(menuId);

document.addEventListener("click", function(){hideMenu(menuId)});
document.addEventListener("contextmenu", function(e){checkIfImage(e, menuId)});

document.getElementById(menuId).addEventListener("click", function(){downloadPic(menuId)});
