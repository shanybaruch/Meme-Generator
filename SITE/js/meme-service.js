'use strict'

var MEME_KEY = 'memeDB'
var gMemeColor = 'red'
var gImgNum = 3
var gImgs = [
    { id: 1, url: 'SITE/img/square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'SITE/img/square/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'SITE/img/square/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'SITE/img/square/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'SITE/img/square/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'SITE/img/square/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'SITE/img/square/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'SITE/img/square/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'SITE/img/square/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'SITE/img/square/10.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: `SITE/img/square/${gImgNum}.jpg`,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 35,
            color: gMemeColor
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setLineTxt(input) {
    gMeme.lines[0].txt = input
    saveToStorage(MEME_KEY, gMeme)
}

function setImg(imgUrl, id) {
    gMeme.selectedImgId = imgUrl
    gImgNum = id

    console.log(gMeme.lines[0].color);
    
    saveToStorage(MEME_KEY, gMeme)
    location.href = 'index.html'
}