'use strict'

var gImgNum = 4
var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['funny', 'cat']
    }
]
var gMeme = {
    selectedImgId: `/SITE/img/square/${gImgNum}.jpg`,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 35,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setLineTxt(input) {
    gMeme.lines[0].txt = input
}