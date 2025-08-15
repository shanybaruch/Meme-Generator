'use strict'


var MEME_KEY = 'memeDB'
var gMemeColor = '#91f6fd'
var gImgNum = 3
var gImgs = [
    { id: 1, url: './SITE/img/square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: './SITE/img/square/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: './SITE/img/square/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: './SITE/img/square/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: './SITE/img/square/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: './SITE/img/square/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: './SITE/img/square/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: './SITE/img/square/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: './SITE/img/square/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: './SITE/img/square/10.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: `SITE/img/square/${gImgNum}.jpg`,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Shany',
            size: 65,
            color: gMemeColor

        },
        {
            txt: 'Baruch',
            size: 65,
            color: gMemeColor
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setLineTxt(input) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (gMeme.selectedLineIdx === i) {
            gMeme.lines[i].txt = input
        }
    }
    saveToStorage(MEME_KEY, gMeme)
}

function setImg(imgUrl, id) {
    gMeme.selectedImgId = imgUrl
    gImgNum = id
    saveToStorage(MEME_KEY, gMeme)
    location.href = 'index.html'
}

function addLine() {
    const newLine = {
        txt: 'New Line',
        size: 65,
        color: gMemeColor,
    }
    gMeme.lines.push(newLine)
}

function removeLine() {
    var currLine = gMeme.selectedImgId
    gMeme.lines.splice(gMeme.lines[currLine], 1)
}