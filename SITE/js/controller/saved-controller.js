'use strict'

function onInitSaved() {
    renderSaved()
}

function renderSaved() {
    getSavedMemes()
    renderSavedMemes()
    renderContentMeme()
}

function renderSavedMemes() {
    var container = document.querySelector('.saved-memes')

    var strHtml = ''
    for (var i = 0; i < gSaved.length; i++) {
        strHtml +=
            `<canvas width="400" height="400" onmousedown="onDown(event)" onmouseup="onUp()"
        onclick="whichLineSelected(event)">
        <img src="${gSaved[i].selectedImgId}" onclick="onImgSelect(${gSaved[i].selectedImgId, gSaved[i].id})"></img>
        </canvas>`
    }
    container.innerHTML = strHtml
    console.log(gSaved)
}

function renderContentMeme() {
    gElCanvas = document.querySelector('canvas')
    console.log(gElCanvas)
    gCtx = gElCanvas.getContext('2d')

    const img = new Image()
    img.src = gSaved[0].selectedImgId

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        fontDesign()

        var x = gElCanvas.width / 2
        var y = 70
        var yLineTwo = y + 310

        var { text, txtTwo } = drawTexts(x, y, yLineTwo)
    }
}

function getSavedMemes() {
    gSaved = loadFromStorage(SAVED_KEY) || []

}

function addSavedImg(meme) {
    gSaved.push({
        selectedImgId: `SITE/img/square/${gImgNum}.jpg`,
        selectedLineIdx: 0,
        lines: [
            {
                txt: meme.lines[0].txt,
                size: meme.lines[0].size,
                color: gMemeColor

            },
        ],
        id: gImgNum
    })
}