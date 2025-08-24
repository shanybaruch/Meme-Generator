'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false
var isInputFocused = false


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    //dark or light mode
    var savedMode = loadFromStorage(MODE_KEY)
    const operations = document.querySelectorAll('.design-operations img')
    if (savedMode === 'dark') {
        document.documentElement.classList.add('dark')
        operations.forEach(img => {
            img.style.backgroundColor = 'white'
            img.style.borderRadius = '35%'

        })
    }

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

    var x = gElCanvas.width / 2
    var y = 70
    var yLineTwo = y + 310

    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[0].x = x
        gMeme.lines[0].y = y
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.lines[0].x = x
        gMeme.lines[0].y = yLineTwo
    }
    console.log(gMeme.lines[0])
    saveToStorage(MEME_KEY, gMeme)

    renderMeme()
}

function renderMeme() {
    const meme = getMeme()

    const img = new Image()
    img.src = meme.selectedImgId

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        fontDesign()

        var x = gMeme.lines[0].x
        var y = gMeme.lines[0].y
        if (gMeme.lines.length >= 1 && gMeme.lines[1].y === '') {
            var yLineTwo = y -80
            gMeme.lines[1].y = yLineTwo
        }

        setAlign()

        var { text, txtTwo } = drawTexts(x, y, yLineTwo)

        //border
        //lenght
        var fontSize = gMeme.lines[0].size
        //width
        var widthLineOne = whatWidthLine(text)
        var widthLineTwo = whatWidthLine(txtTwo)

        if (isInputFocused) drawBorder(x, y, fontSize, widthLineOne, widthLineTwo)
    }

}

function setAlign() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (gMeme.lines[i].align === 'center') onAlignCenter()
        else if (gMeme.lines[i].align === 'left') onAlignLeft()
        else if (gMeme.lines[i].align === 'right') onAlignRight()
    }
}

function drawBorder(x, y, fontSize, widthLineOne, widthLineTwo) {
    if (gMeme.selectedLineIdx === 0) {
        gCtx.strokeRect(
            x - (widthLineOne / 2),
            y - fontSize + 5,
            widthLineOne,
            fontSize
        )
    }
    if (gMeme.selectedLineIdx === 1 && gMeme.lines.length > 1) {
        gCtx.strokeRect(
            x - (widthLineTwo / 2),
            gElCanvas.height - fontSize - 15,
            widthLineTwo,
            fontSize
        )
    }
}

function whatWidthLine(txt) {
    var widthLine
    if (gMeme.selectedLineIdx === 0) widthLine = gCtx.measureText(txt).width
    else if (gMeme.selectedLineIdx === 1) widthLine = gCtx.measureText(txt).width

    return widthLine
}

function drawTexts(x, y, yLineTwo) {
    const text = gMeme.lines[0].txt
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    if (gMeme.lines[1]) {
        const txtTwo = gMeme.lines[1].txt
        gCtx.fillText(txtTwo, x, yLineTwo)
        gCtx.strokeText(txtTwo, x, yLineTwo)
        return { text, txtTwo }
    }
    return { text }
}

function whichLineSelected(ev) {
    const { offsetX, offsetY } = ev
    console.log({ offsetX, offsetY })

    var i = gMeme.selectedLineIdx

    var x = gMeme.lines[i].x
    var y = gMeme.lines[i].y
    var yLineTwo = y + 310

    var fontSize = gMeme.lines[0].size
    var { text, txtTwo } = drawTexts(x, y)

    var widthLineOne = whatWidthLine(text)
    var widthLineTwo = whatWidthLine(txtTwo)

    var lineOneX = x - (widthLineOne / 2)
    var lineOneY = y

    var lineTwoX = x - (widthLineTwo / 2)
    var lineTwoY = 310

    if (offsetX >= x - (widthLineOne / 2) && offsetX <= x + (widthLineOne / 2) &&
        offsetY <= y && offsetY >= 10) {
        //put border
        gCtx.strokeRect(
            x - (widthLineOne / 2),
            y - fontSize + 5,
            widthLineOne,
            fontSize
        )
        gMeme.selectedLineIdx = 0
        document.querySelector(".input-sentence").focus()
    } else if (offsetX >= x - (widthLineTwo / 2) && offsetX <= x + (widthLineTwo / 2) &&
        offsetY <= yLineTwo && offsetY >= gElCanvas.height - fontSize - 10) {
        //put border
        gCtx.strokeRect(
            x - (widthLineTwo / 2),
            gElCanvas.height - fontSize - 15,
            widthLineTwo,
            fontSize
        )
        gMeme.selectedLineIdx = 1
        document.querySelector(".input-sentence").focus()
    } else {
        renderMeme()
    }
}

function onDownloadCanvas(elLink) {
    const dataURL = gElCanvas.toDataURL('image/png')
    elLink.href = dataURL
    elLink.download = 'meme.png'
}

function onSave() {
    var meme = gMeme
    const canvas = document.querySelector('canvas')
    const saved = canvas.toDataURL('image/png')

    addSavedImg(meme)
    saveToStorage(SAVED_KEY, gSaved)
    console.log(gSaved);
    
    flashMsg('Meme saved!')
}

// Design Meme
function fontDesign() {
    gCtx.beginPath()
    gCtx.font = `${gMeme.lines[0].size}px Impact`
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = gMeme.lines[0].color
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 2
}

function onSetColor(elImg) {
    var inputColor = document.querySelector('.input-color')

    elImg.addEventListener("click", () => {
        inputColor.click()
    })
    inputColor.addEventListener("input", () => {
        const chosenColor = inputColor.value

        gMemeColor = chosenColor
        gMeme.lines.forEach(line => {
            line.color = gMemeColor
        })

        gCtx.strokeStyle = chosenColor

        const text = gMeme.lines[0].txt
        const x = gElCanvas.width / 2
        const y = 70
        gCtx.strokeText(text, x, y)

        if (gMeme.lines[1]) {
            const textTwo = gMeme.lines[1].txt
            gCtx.strokeText(textTwo, x, y)
        }

        saveToStorage(MEME_KEY, gMeme)
        renderMeme()
    })
}

//on canvas
function onDown(ev) {
    gIsMouseDown = true
}

function onUp() {
    gIsMouseDown = false
}

//operations
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

function switchLine() {
    if (gMeme.selectedLineIdx === 0 && gMeme.lines.length > 0) {
        gMeme.selectedLineIdx = 1
        document.querySelector(".input-sentence").focus()
        renderMeme()
    }
    else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
        document.querySelector(".input-sentence").focus()
        renderMeme()
    }
    else { }
}

//crudl
function onRemoveLine() {
    saveToStorage(MEME_KEY, gMeme)
    removeLine()
    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

function onAddLine() {
    addLine()
    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

function onChangeLineTxt(ev) {
    var elInput = ev.target.value
    setLineTxt(elInput)
    renderMeme()
}

//text align
function onAlignLeft() {
    var i = gMeme.selectedLineIdx

    var x = whatWidthLine(gMeme.lines[i].txt / 2)
    var y = gMeme.lines[i].y

    const text = gMeme.lines[i].txt
    gMeme.lines[i].x = x
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gMeme.lines[i].align = 'left'

    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

function onAlignCenter() {
    var i = gMeme.selectedLineIdx

    var x = gElCanvas.width / 2
    var y = gMeme.lines[i].y

    const text = gMeme.lines[i].txt
    gMeme.lines[i].x = x
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gMeme.lines[i].align = 'center'

    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

function onAlignRight() {
    var i = gMeme.selectedLineIdx

    var x = gElCanvas.width - whatWidthLine(gMeme.lines[i].txt / 2)
    var y = gMeme.lines[i].y

    const text = gMeme.lines[i].txt
    gMeme.lines[i].x = x
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gMeme.lines[i].align = 'right'

    saveToStorage(MEME_KEY, gMeme)
    renderMeme()
}

//display toggle light dark
function displayToggle() {
    const html = document.documentElement
    const operations = document.querySelectorAll('.design-operations img')
    const btn = document.querySelector(".fa-circle-half-stroke")

    btn.addEventListener("click", () => {
        html.classList.toggle("dark")

        if (html.classList.contains('dark')) {
            saveToStorage(MODE_KEY, 'dark')
            operations.forEach(img => {
                img.style.backgroundColor = 'white'
                img.style.borderRadius = '35%'

            })
        } else {
            saveToStorage(MODE_KEY, 'light')
        }
    })
}

//flashmsg on save
function flashMsg(txt = 'Meme saved!') {
    var elMsg = document.querySelector('.flash-msg')
    console.log(elMsg)
    elMsg.textContent = txt

    elMsg.classList.remove('hide')

    setTimeout(() => elMsg.classList.add('hide'), 2000)
}