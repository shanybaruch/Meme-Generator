'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    var meme = loadFromStorage(MEME_KEY)
    if (meme) gMeme = meme
    else saveToStorage(MEME_KEY, gMeme)
    
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()

    const img = new Image()
    img.src = meme.selectedImgId

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        gCtx.font = `${meme.lines[0].size}px Impact`
        gCtx.fillStyle = 'white'
        gCtx.strokeStyle = meme.lines[0].color
        gCtx.textAlign = 'center'
        const text = meme.lines[0].txt
        const x = gElCanvas.width / 2
        const y = 50

        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    }
}

function onChangeLineTxt(ev) {
    var elInput = ev.target.value
    setLineTxt(elInput)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataURL = gElCanvas.toDataURL('image/png')
    elLink.href = dataURL
    elLink.download = 'meme.png'
}

// Design Meme
function onSetColor(elImg) {
    var inputColor = document.querySelector('.input-color')

    elImg.addEventListener("click", () => {
        inputColor.click()
    })
    inputColor.addEventListener("input", () => {
        const chosenColor = inputColor.value
        gMemeColor = chosenColor
        gMeme.lines[0].color = gMemeColor
                
        gCtx.strokeStyle = chosenColor

        const text = gMeme.lines[0].txt
        const x = gElCanvas.width / 2
        const y = 50

        gCtx.strokeText(text, x, y)

        console.log(gMeme.lines[0].color)

        saveToStorage(MEME_KEY, gMeme)
    })
}

function onSetDecreaseFont() {

}

function onSetIncreaseFont() {

}

//on canvas
function onDown(ev) {
    gIsMouseDown = true
}

function onUp() {
    gIsMouseDown = false
}