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



// Todolist js, start

const categorySelect = document.getElementById('category-select');
const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskLists = document.getElementById('task-lists');

addTaskButton.addEventListener('click', () => {
    const category = categorySelect.value;
    const taskDescription = newTaskInput.value;

    if (taskDescription.trim() !== '') {
        const taskList = document.getElementById(`${category}-tasks`).querySelector('ul');
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskDescription}</span>
        `;
        taskList.appendChild(newTask);
        newTaskInput.value = '';
    }
});

taskLists.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const taskSpan = event.target.nextElementSibling;
        taskSpan.classList.toggle('completed', event.target.checked);
    }
});

// Todolist js, end