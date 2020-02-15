var login_btn = document.querySelector('#login_btn')
var logout_btn = document.querySelector('#logout_btn')

// logout action
logout_btn.addEventListener('click', (e) => {
    e.preventDefault()
    close_modals()
    sessionStorage.removeItem('user')
    user.innerText = 'Login/Signup'
    location.reload()
})

// login form data
var l_email = document.querySelector('#l_email')
var l_p1 = document.querySelector('#l_p1')

login_btn.addEventListener('click', (e) => {
    e.preventDefault()
    login_btn.innerHTML = '<i class="fa fa-cog fa-spin"></i>'
    login_btn.disabled = true

    fetch("/loginweb/", {
        method: 'POST',
        body: JSON.stringify({
            email: l_email.value,
            password: l_p1.value
        })
    })
        .then(d => {
            login_btn.innerHTML = 'Login'
            login_btn.disabled = false
            return d.json()
        })
        .then(d => {
            console.log(d)
            if (d.success && d.status) {
                // if otp verification is done close all modals
                sessionStorage.user = "@ " + d.first_name + ' ' + d.last_name
                user.innerText = sessionStorage.user
                close_modals()
                location.reload()
            } else if (d.success && !d.status) {
                // if the otp verification is not done show otp modal
                sessionStorage.user = "# " + d.first_name + ' ' + d.last_name
                user.innerText = sessionStorage.user

                close_modals()
                o_cont.classList.add('show')
            } else {
                alert(d.message ? d.message : "something went wrong")
            }
        })
        .catch(err => {
            console.error(err)
        })
})

// verify otp
verify_btn.addEventListener('click', (e) => {
    e.preventDefault()
    verify_btn.innerHTML = '<i class="fa fa-cog fa-spin"></i>'
    verify_btn.disabled = true

    fetch("/web_verify_otp/", {
        method: 'POST',
        body: JSON.stringify({
            otp: o_otp.value,
        })
    })
        .then(d => {
            verify_btn.innerHTML = 'Verify OTP'
            verify_btn.disabled = false
            return d.json()
        })
        .then(d => {
            console.log(d)
            if (d.success) {
                close_modals()

                sessionStorage.user = '@' + sessionStorage.user.slice(1)
                user.innerText = sessionStorage.user
                location.reload()
            } else {
                alert(d.message ? d.message : "something went wrong")
            }
        })
        .catch(err => {
            console.error(err)
        })
})

// incorrect phno case
var ic_phno = document.querySelector('#ic_phno')

ic_phno.addEventListener('click', (e) => {
    e.preventDefault()
    var new_phno = prompt('Please enter the correct phone no:')
    verify_btn.innerHTML = '<i class="fa fa-cog fa-spin"></i>'
    verify_btn.disabled = true

    fetch('/new_conno/', {
        method: 'post',
        body: JSON.stringify({
            contact_no: new_phno
        })
    })
        .then(d => {
            verify_btn.innerHTML = 'Verify OTP'
            verify_btn.disabled = false
            return d.json()
        })
        .then(d => {
            console.log(d)
        })
        .catch(err => {
            console.error(err)
        })
})

// resend otp case
var rs_otp = document.querySelector('#rs_otp')

rs_otp.addEventListener('click', (e) => {
    e.preventDefault()
    verify_btn.innerHTML = '<i class="fa fa-cog fa-spin"></i>'
    verify_btn.disabled = true

    fetch('/resend_otp/')
        .then(d => {
            verify_btn.innerHTML = 'Verify OTP'
            verify_btn.disabled = false
            return d.json()
        })
        .then(d => {
            console.log(d)
        })
        .catch(err => {
            console.error(err)
        })
})