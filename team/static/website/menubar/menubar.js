// these 2 are declared in the modal-dom js
let menuTrigger = document.querySelector('.menu-trigger');
let menubar = document.querySelector('.menubar');
let menubar_a = document.querySelectorAll('.menubar a');

menuTrigger.addEventListener('click', function () {
    menuTrigger.classList.toggle('menu-close');
    menubar.classList.toggle('menu-close');
});