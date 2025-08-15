'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false
var isInputFocused = false

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    var meme = loadFromStorage(MEME_KEY)
    if (meme) gMeme = meme
    else saveToStorage(MEME_KEY, gMeme)

    const elInput = document.querySelector('.input-sentence')
    elInput.addEventListener('focus', () => {
        isInputFocused = true
        renderMeme()
    })
    elInput.addEventListener('blur', () => {
        isInputFocused = false
        renderMeme()
    })
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = meme.selectedImgId

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        fontDesign()

        var x = gElCanvas.width / 2
        var y = 70

        var { text, txtTwo } = drawTexts(x, y)

        //border
        //style
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 1
        //lenght
        var fontSize = gMeme.lines[0].size
        //width
        var widthLineOne = whatWidthLine(text)
        var widthLineTwo = whatWidthLine(txtTwo)

        const borderY = fontSize + 10

        const borderXOne = widthLineOne + 10
        const borderXTwo = widthLineTwo + 10

        if (isInputFocused && gMeme.selectedLineIdx === 0) {
            gCtx.strokeRect(
                x - (widthLineOne / 2) - 4,
                y - borderY + 10,
                borderXOne,
                borderY + 5
            )
        }
        if (isInputFocused && gMeme.selectedLineIdx === 1) {
            gCtx.strokeRect(
                x - (widthLineTwo / 2) - 4,
                400 - borderY - 10,
                borderXTwo,
                borderY + 8
            )
        }
    }
}

function whatWidthLine(txt) {
    var widthLine
    if (gMeme.selectedLineIdx === 0) widthLine = gCtx.measureText(txt).width
    else if (gMeme.selectedLineIdx === 1) widthLine = gCtx.measureText(txt).width

    return widthLine
}

function drawTexts(x, y) {
    const text = gMeme.lines[0].txt
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    const txtTwo = gMeme.lines[1].txt
    gCtx.fillText(txtTwo, x, y + 310)
    gCtx.strokeText(txtTwo, x, y + 310)

    return { text, txtTwo }
}

function fontDesign() {
    gCtx.font = `${gMeme.lines[0].size}px Impact`
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = gMeme.lines[0].color
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 2
}

function onAlignLeft() {
    console.log('align left')
}

function onAlignCenter() {
    console.log('align center')
}

function onAlignRight() {
    console.log('align right')
}

function whichLineSelected(ev) {
    const { offsetX, offsetY } = ev

    console.log({ offsetX, offsetY });
}

function switchLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
    }
    else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
    }
}

function onRemoveLine() {
    gMeme.lines
}

function onAddLine() {

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
        const textTwo = gMeme.lines[1].txt
        const x = gElCanvas.width / 2
        const y = 70

        gCtx.strokeText(text, x, y)
        gCtx.strokeText(textTwo, x, y)

        renderMeme()
        saveToStorage(MEME_KEY, gMeme)
    })
}

function onSetDecreaseFont() {
    var decFont = gMeme.lines[0].size - 4
    gMeme.lines[0].size = decFont
    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

function onSetIncreaseFont() {
    var decFont = gMeme.lines[0].size + 4
    gMeme.lines[0].size = decFont
    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

//on canvas
function onDown(ev) {
    gIsMouseDown = true
}

function onUp() {
    gIsMouseDown = false
}