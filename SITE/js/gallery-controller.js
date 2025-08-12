'use strict'

gImgs = [
    {src: `SITE/img/square/1.jpg`},
    {src: `SITE/img/square/2.jpg`},
    {src: `SITE/img/square/3.jpg`},
    {src: `SITE/img/square/4.jpg`},
    {src: `SITE/img/square/5.jpg`},
    {src: `SITE/img/square/6.jpg`},
    {src: `SITE/img/square/7.jpg`},
    {src: `SITE/img/square/8.jpg`},
    {src: `SITE/img/square/9.jpg`},
    {src: `SITE/img/square/10.jpg`},
]

function renderGallery() {
    var elGallery = document.querySelector('.imgs')
    var strHtml = ''
    
    for (var i = 0; i < gImgs.length; i++) {
        strHtml += 
        `<div class="img-wrapper">
        <img src="${gImgs[i].src}" onclick="onImgSelect()"></img>
        </div>`
    }    
    elGallery.innerHTML += strHtml
}

function onImgSelect() {
    setImg()
}