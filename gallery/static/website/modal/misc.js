var update_color;
var user = document.querySelector('#loggedin_user')
var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var cno_regex = /^(\+\d{2,4})?\s?(\d{10})$/g

// core models stuff
var m_basic = document.querySelectorAll('.m_basic')
var l_cont = document.querySelector('#l_cont')
var s_cont = document.querySelector('#s_cont')
var x_cont = document.querySelector('#x_cont')
var o_cont = document.querySelector('#o_cont')

// extras
var covers = document.querySelectorAll('.cover')
var close_btns = document.querySelectorAll('.close_btn')

// alts
var to_signup = document.querySelector('#to_signup')
var to_login = document.querySelector('#to_login')

// close all modals 
close_modals = () => {
    m_basic.forEach(div => div.classList.remove('show'))
}

// if user data is available in sessionstorage then login the user
if (sessionStorage.user) {
    user.innerHTML = sessionStorage.user
}

// clicking on loggedin_user unveils the modal
user.addEventListener('click', (e) => {
    e.preventDefault()

    console.log('show', user.innerHTML.toLowerCase())
    if (user.innerHTML[0] == '#') {
        o_cont.classList.add('show')
    } else if (user.innerHTML.toLowerCase() == 'login/signup') {
        console.log('open signup modal')
        s_cont.classList.add('show')
    } else {
        x_cont.classList.add('show')
    }
})

// clicking on close btn closes modal
close_btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        close_modals()
    })
})

// clicking on cover closes modal
covers.forEach((cover) => {
    cover.addEventListener('click', (e) => {
        e.preventDefault()
        close_modals()
    })
})

// alternatives
to_signup.addEventListener('click', (e) => {
    e.preventDefault()
    close_modals()
    s_cont.classList.add('show')
})
to_login.addEventListener('click', (e) => {
    e.preventDefault()
    close_modals()
    l_cont.classList.add('show')
})