'use strict'

var MEME_KEY = 'memeDB'

function renderGallery() {
    //if color changed
    var memeColorSaved = loadFromStorage(MEME_KEY)
    console.log(memeColorSaved);
    if (memeColorSaved) gMeme = memeColorSaved
    
    console.log(gMeme.lines[0].color);
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
        console.log(gMeme.lines[0].color);

    var imgSrc = src.src
    const relativePath = imgSrc.split(location.origin + '/')[1]
    gMeme.selectedImgId = relativePath
        
    saveToStorage(MEME_KEY, gMeme)
    console.log(gMeme.lines[0].color);
    
    setImg(relativePath, id)
}