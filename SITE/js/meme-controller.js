'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false

function onInit() {
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

        gCtx.font = '40px Impact'
        gCtx.fillStyle = meme.lines.color
        gCtx.strokeStyle = 'white'
        gCtx.textAlign = 'center'
        const text = meme.lines[0].txt        
        const x = gElCanvas.width / 2
        const y = 50

        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    }
}

//on canvas
function onDown(ev) {
    gIsMouseDown = true
}

function onUp() {
    gIsMouseDown = false
}