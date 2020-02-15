// regex
var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
var phno_regex = /^[0-9]{10}$/

// adjust the size of the man in the suit
var cover = document.querySelector('.cover');
var header = document.querySelector('header');
var innerHeight = Number(window.innerHeight);
var innerWidth = Number(window.innerWidth);

if (innerWidth < 700) {
    if (innerHeight > 550) {
        innerHeight = 550;
    }
}

header.style.height = `${innerHeight}px`;
cover.style.height = `${innerHeight}px`;

// send user's message to backend
submit_btn.addEventListener('click', (e) => {
    e.preventDefault()

    // dom
    var submit_btn = document.querySelector("#submit_btn")
    var email = document.querySelector('input[name=email]')
    var msg = document.querySelector('textarea[name=msg]')
    var csrf = document.querySelector('input[name=csrfmiddlewaretoken]')

    // validation
    if (document.querySelector('input[name="name"]').value.length < 3) {
        alert('please enter a proper name')
        return
    }
    if (!email_regex.exec(email.value)) {
        alert('please enter a proper email')
        return
    }
    if (msg.value.length < 30) {
        alert('message should be atleast 30 characters long')
        return
    }

    // put button on the loading state
    submit_btn.innerHTML = '<i class="fa fa-1x fa-spinner fa-spin"></i>'
    // disable the btn to prevent multiple requests
    submit_btn.disabled = true

    // sending request
    console.log('sending the message to server')
    fetch('/message/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "X-CSRFToken": csrf.value
        },
        body: JSON.stringify({
            'name': document.querySelector('input[name="name"]').value,
            'email': email.value,
            'msg': msg.value,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            document.querySelector('input[name="name"]').value = ''
            email.value = ''
            msg.value = ''

            // reenable the submit btn
            submit_btn.disabled = false
            // style the button
            submit_btn.style.background = 'green'
            submit_btn.style.boxShadow = '0 0 30px green'
            setTimeout(() => {
                submit_btn.innerHTML = 'success'
            }, 500)
        })
        .catch(error => {
            console.error(error)
            // alert('error! please refresh and try again')
        })
})