'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false

function onInit() {
    const meme = loadFromStorage(MEME_KEY)
    if (meme) gMeme.selectedImgId = meme
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()

    const gElCanvas = document.querySelector('canvas')
    const gCtx = gElCanvas.getContext('2d')

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

//on canvas
function onDown(ev) {
    gIsMouseDown = true
}

function onUp() {
    gIsMouseDown = false
}