'use strict'

var MEME_KEY = 'memeDB'

function onInitGallery() {
    var savedMode = loadFromStorage(MODE_KEY)
    if (savedMode === 'dark') document.documentElement.classList.add('dark')

    importChangedColor()
    renderGallery()
}

function renderGallery() {
    var elGallery = document.querySelector('.imgs')
    var strHtml = ''

    for (var i = 0; i < gImgs.length; i++) {
        strHtml +=
            `<div class="img-wrapper">
        <img src="${gImgs[i].url}" onclick="onImgSelect(${i + 1})"></img>
            </div>`
    }
    // console.log(strHtml);
    elGallery.innerHTML = strHtml
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