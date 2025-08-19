'use strict'

function onInitSaved() {
    var savedMode = loadFromStorage(MODE_KEY)
    if (savedMode === 'dark') document.documentElement.classList.add('dark')

    getSavedMemes()
    renderSavedMemes()
    renderContentMeme()
}

function renderSavedMemes() {
    var elContainer = document.querySelector('.saved-memes')
    // console.log(elContainer);

    var strHtml = ''
    for (var i = 0; i < gSaved.length; i++) {
        strHtml +=
            `<canvas width="400" height="400" onmousedown="onDown(event)" onmouseup="onUp()"
        onclick="whichLineSelected(event)">
        <img src="${gSaved[i].selectedImgId}" onclick="onImgSelect(${gSaved[i].selectedImgId, gSaved[i].id})"></img>
        </canvas>`
    }

    elContainer.innerHTML = strHtml
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

        var { text, txtTwo } = putContent(x, y, yLineTwo)
        console.log({ text, txtTwo });


        var fontSize = gSaved.lines[0].size
    }
}

function putContent(x, y, yLineTwo) {

    for (var i = 0; i < gSaved.length; i++) {
        var text = gSaved[i].lines[0].txt
        var chosenColor = gSaved[i].lines.color
    }

    gMemeColor = chosenColor
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)


    gCtx.strokeStyle = gMemeColor

    if (gSaved[1].lines[1]) {
        const txtTwo = gMeme.lines[1].txt
        gCtx.fillText(txtTwo, x, yLineTwo)
        gCtx.strokeText(txtTwo, x, yLineTwo)
        return { text, txtTwo }
    }
    return { text }
}

function getSavedMemes() {
    gSaved = loadFromStorage(SAVED_KEY) || []
}

function addSavedImg(meme) {
    console.log(JSON.stringify(gSaved))

    gSaved.push(meme)

    console.log(gSaved)
    console.log(JSON.stringify(gSaved))
}