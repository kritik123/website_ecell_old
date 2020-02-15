// show the gallery
var gallery_div = document.querySelector('#gallery')
for (var i = 0; i < 15; i++) {
    gallery_div.innerHTML += `
        <div class='gimg'>
            <img src='/static/website/gallery/img/${i + 1}.jpg'>
        </div>
    `
}

// on click show big img
var gimgs = document.querySelectorAll('.gimg img')
var bimg = document.querySelector('#big_img')
var bcontainer = document.querySelector('#big_container')
var bcloseBtn = document.querySelector('#bcloseBtn')
var leftBtn = document.querySelector('#left')
var rightBtn = document.querySelector('#right')


gimgs.forEach(gimg => {
    gimg.addEventListener('click', function (e) {
        e.preventDefault()
        bimg.src = gimg.src
        bcontainer.style.top = 0
        bimg.style.height = '90vh'
    })
})


bcontainer.addEventListener('click', (e) => {
    e.preventDefault()
    // if clicked on img return 
    if (e.target != bcontainer) return
    // if clicked on the container
    bcontainer.style.top = "-100vh"
    bimg.style.height = '0'
})

bcloseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    bcontainer.style.top = "-100vh"
    bimg.style.height = '0'
})

leftBtn.addEventListener('click', (e) => {
    e.preventDefault()
    var bsrc = bimg.src.split('/')
    var newImgNo = Number(bsrc.pop().split('.')[0]) - 1
    // if new img is out of range let quit
    if (newImgNo < 1) return
    // else proceed
    var leftImg = newImgNo + '.jpg'
    bsrc.push(leftImg)

    // update the new bimg
    bimg.src = bsrc.join('/')
})

rightBtn.addEventListener('click', (e) => {
    e.preventDefault()
    var bsrc = bimg.src.split('/')
    var newImgNo = Number(bsrc.pop().split('.')[0]) + 1
    // if new img is out of range let quit
    if (newImgNo > 15) return
    // else proceed
    var rightImg = newImgNo + '.jpg'
    bsrc.push(rightImg)

    // update the new bimg
    bimg.src = bsrc.join('/')
})