var events = document.querySelector('#articles')

put_events_in_place = (data) => {
    data.events.forEach(function (event, i) {
        if (i % 2 == 0) {
            events.innerHTML += (`
            <article>
                <div class=article-layout>
                    <div class=text>
                        <h2 class=""><a href="/event/${event.id}">${event.name}</a></h2>
                        <p><strong>Venue: </strong>${event.venue} on ${event.date} ${event.time != 'null' ? `at ${event.time}` : ''}</p>
                        <p>${event.details}</p>
                        <div class='center_btn'>
                            <a href="/event/${event.id}" class="register_btn" data-eid=${event.id}>read more</a>
                        </div>
                    </div>
                    <div class="img ">
                        <img src='${event.cover_pic}' alt=""> </div>
                </div>
            </article>
            `)
        } else {
            events.innerHTML += (`
            <div class=right-grey>
                <svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 100 10" preserveAspectRatio=none>
                    <polygon points="100 0 100 10 0 10" /> </svg>
            </div>
            <article class=reverse-layout>
                <div class=article-layout>
                    <div class=text>
                        <h2 class=""><a href="/event/${event.id}">${event.name}</a></h2>
                        <p><strong>Venue: </strong>${event.venue} on ${event.date} ${event.time != 'null' ? `at ${event.time}` : ''}</p>
                        <p>${event.details}</p>
                        <div class='center_btn'>
                            <a href="/event/${event.id}" class="register_btn" data-eid=${event.id}>read more</a>
                        </div>
                    </div>
                    <div class="img ">
                        <img src='${event.cover_pic}' alt=""> </div>
                </div>
            </article>
            <div class=right-white>
                <svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 100 10" preserveAspectRatio=none>
                    <polygon points="100 0 100 10 0 10" /> </svg>
            </div>
            `)
        }
    })
}

fetch('/events/list/')
    .then(data => data.json())
    .then(function (data) {
        if (data.success = true) {
            // hide the spinner
            document.querySelector('#spinner').remove();
            // put data
            put_events_in_place(data)
        } else {
            events.innerHTML = `<center><h3>Coming Soon</h3></center>`
        }
    })

