// Time and date js, start

function updateDateTime() {
    const now = new Date();

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, dateOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

    const datetimeDiv = document.getElementById("datetime");
    datetimeDiv.textContent = `${formattedDate} - ${formattedTime}`;
}

// Initial display
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);

// Time and date js, end