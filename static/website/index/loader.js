// display the svg after the background has been loader
document.querySelector('svg').style.display = 'block'
var body = document.querySelector('body')
body.style.background = 'white'
body.style.color = 'black'

// new Vivus('loader_svg', {
//     type: 'sync',
//     duration: 300,
//     animTimingFunction: Vivus.EASE
// });

// draw the lines
var lineDrawing = anime({
    targets: 'path:not(#logo)',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuad',
    duration: 4000,
    delay: function (el, i) {
        return 500 + (i%2)*250
    },
    direction: 'alternate',
    loop: false
});

// show the circles
var circles = document.querySelectorAll('circle');
var i = 1
circles.forEach(circle => {
    i += 1
    setTimeout(() => {
        circle.style.opacity = 1
    }, 2000 + i * 1000 / 20);
})

// show the texts
document.querySelector('#logo_text').style.opacity = 1
var texts = document.querySelectorAll('text');
texts.forEach(text => {
    i += 1
    setTimeout(() => {
        text.style.opacity = 1
    }, 2000 + i * 1000 / 20);
})

// animate the logo
document.querySelector('#logo').style['strokeDashoffset']='0px'

// hide the loader
setTimeout(() => {
    document.querySelector('.loader').style.transform = 'translateY(-125vh)';
    document.querySelector('.loader svg').style.opacity = 0;
    body.style['overflow-y']='auto'
    body.style.height='auto'
}, 6300)
// }, 0)    

setTimeout(()=>{
    document.querySelector('.loader').remove();
},6500)
// },0)
