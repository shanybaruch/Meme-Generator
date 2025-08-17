'use strict'

var SAVED_KEY = 'savedDB'

function renderSaved() {
    console.log(gSaved)

    var elSaved = document.querySelector('.saved-memes')
    console.log(elSaved);
    
    var strHtml = ''

    for (var i = 0; i < gSaved.length; i++) {
        console.log(gSaved[i].selectedImgId)

        strHtml +=
            `<div class="img-wrapper">
        <img src="${gSaved[i].selectedImgId}" onclick="onImgSelect(this, ${i + 1})"></img>
            </div>`
    }
    elSaved.innerHTML = strHtml
    console.log(gSaved)


}

