'use strict'

var MEME_KEY = 'memeDB'

function renderGallery() {
    importChangedColor()

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

function importChangedColor() {
    var memeColorSaved = loadFromStorage(MEME_KEY)
    if (memeColorSaved) gMeme = memeColorSaved
}

function onImgSelect(src, id) {
    console.log(gMeme);

    var imgSrc = src.src
    const relativePath = imgSrc.split(location.origin + '/')[1]
    gMeme.selectedImgId = relativePath

    saveToStorage(MEME_KEY, gMeme)
    console.log(gMeme);

    setImg(relativePath, id)
}