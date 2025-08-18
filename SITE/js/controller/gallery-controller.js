'use strict'

var MEME_KEY = 'memeDB'

function renderGallery() {
    importChangedColor()
    renderImgs()
}

function importChangedColor() {
    var memeColorSaved = loadFromStorage(MEME_KEY)
    if (memeColorSaved) gMeme = memeColorSaved
}

function onImgSelect(id) {
    const path = `SITE/img/square/${id}.jpg`
    gMeme.selectedImgId = path

    saveToStorage(MEME_KEY, gMeme)
    setImg(path, id)
}

function renderImgs() {
    var elGallery = document.querySelector('.imgs')
    var strHtml = ''

    for (var i = 0; i < gImgs.length; i++) {
        strHtml +=
            `<img src="${gImgs[i].url}" onclick="onImgSelect(${i + 1})">
            </img>`
    }
    elGallery.innerHTML = strHtml
}