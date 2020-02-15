var signup_btn = document.querySelector('#signup_btn')
var verify_btn = document.querySelector('#verify_btn')

// signup form data
var s_n1 = document.querySelector('#s_n1')
var s_n2 = document.querySelector('#s_n2')
var s_email = document.querySelector('#s_email')
var s_cno = document.querySelector('#s_cno')
var s_p1 = document.querySelector('#s_p1')
var s_p2 = document.querySelector('#s_p2')

var o_otp = document.querySelector('#o_otp')

// signup
signup_btn.addEventListener('click', (e) => {
    e.preventDefault()
    // if input is not valid return
    if (!s_validator()) {

        return false
    }

    signup_btn.innerHTML = '<i class="fa fa-cog fa-spin"></i>'
    signup_btn.disabled = true

    fetch("/register/", {
        method: 'POST',
        body: JSON.stringify({
            first_name: s_n1.value,
            last_name: s_n2.value,
            email: s_email.value,
            password: s_p1.value,
            contact_no: s_cno.value
        })
    })
        .then(d => {
            signup_btn.innerHTML = 'Signup'
            signup_btn.disabled = false
            return d.json()
        })
        .then(d => {
            console.log(d)
            if (d.success) {
                close_modals()
                alert('you have successfully signedup. Please proceed to login!')
                l_cont.classList.add('show')
            } else {
                alert(d.message ? d.message : "something went wrong")
            }
        })
        .catch(err => {
            console.error(err)
        })
})

s_validator = () => {
    if (s_p1.value.length < 6) {
        alert("please enter a stronger password")
        return false
    }
    if (s_p1.value !== s_p2.value) {
        alert("password dont match")
        return false
    }
    if (!email_regex.test(s_email.value)) {
        alert("please enter a valid email")
        return false
    }
    if (s_n1.value.length < 4 || s_n2.value.length < 4) {
        alert("name should be atleast 3 chars")
        return false
    }

    return true
}