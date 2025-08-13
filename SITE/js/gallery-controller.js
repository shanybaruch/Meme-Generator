'use strict'

var MEME_KEY = 'memeDB'

function renderGallery() {
    var elGallery = document.querySelector('.imgs')
    var strHtml = ''

    for (var i = 0; i < gImgs.length; i++) {
        strHtml +=
            `<div class="img-wrapper">
            <img src="${gImgs[i].url}" onclick="onImgSelect(this, ${i + 1})"></img>
            </div>`
    }
    elGallery.innerHTML = strHtml
}

function onImgSelect(src, id) {
    var imgSrc = src.src
    const relativePath = imgSrc.split(location.origin + '/')[1]
    gMeme.selectedImgId = relativePath
        
    saveToStorage(MEME_KEY, gMeme)
    setImg(relativePath, id)
}