'use strict'


function renderSaved() {
    console.log(gSaved)
    gSaved = loadFromStorage(SAVED_KEY) || []

    var container = document.querySelector('.saved-memes')
    console.log(container)

    // var strHtml = ''

    // for (var i = 0; i < gSaved.length; i++) {
    //     console.log(gSaved[i].selectedImgId)

    //     strHtml +=
    //         `<div class="img-wrapper">
    //     <img src="${gSaved[i].selectedImgId}" onclick="onImgSelect(this, ${i + 1})"></img>
    //         </div>`
    // }
    // container.innerHTML = strHtml
    // console.log(gSaved)


}

