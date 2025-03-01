document.addEventListener('DOMContentLoaded', function() {

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

// Searchbar js, start
const searchForm = document.getElementById('search-form');
if (searchForm) {
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value.trim();
    if (searchInput === '') return;
    if (isUrl(searchInput)) {
        let url = searchInput;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        window.location.href = url;
    } else {
        const searchQuery = encodeURIComponent(searchInput);
        window.location.href = 'https://www.google.com/search?q=' + searchQuery;
    }
});

    function isUrl(str) {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    }
}
// Searchbar js, end


// Todolist js, start
const taskLists = document.getElementById('task-lists');
if (taskLists) { // Check if taskLists exists before running to-do list code
    const categorySelect = document.getElementById('category-select');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');

    // Load tasks from local storage
    loadTasksFromLocalStorage();

    addTaskButton.addEventListener('click', () => {
        const category = categorySelect.value;
        const taskDescription = newTaskInput.value;

        console.log("Category:", category);
        console.log("Task Description:", taskDescription);

        if (taskDescription.trim() !== '') {
            const taskList = document.getElementById(`${category}-tasks`).querySelector('ul');
            console.log("Task List:", taskList);

            if (taskList) {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <input type="checkbox">
                <span>${taskDescription}</span>
            `;
            console.log("New Task:", newTask);
            taskList.appendChild(newTask);
            newTaskInput.value = '';

            // Store tasks in local storage
            saveTasksToLocalStorage();

        } else {
            console.error("Task list not found for category:", category);
        }
    }
});

        taskLists.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
                const taskSpan = event.target.nextElementSibling;
                taskSpan.classList.toggle('completed', event.target.checked);
                saveTasksToLocalStorage(); //save tasks to local storage when a checkbox is changed.
            }
        });
    } else {
        console.error("Element with ID 'task-lists' not found.");
        // This console.error message is expected on pages where the 'task-lists' element does not exist, such as index.html.
        // The to-do list functionality is only intended for lists.html, and the conditional check prevents errors on other pages.
    }
    
});

// Function to save tasks to local storage:
function saveTasksToLocalStorage() {
    const tasks = {};
    const taskLists = document.querySelectorAll('#task-lists .task-list');

    taskLists.forEach(taskListElement => {
        const category = taskListElement.id.replace('-tasks', '');
        const taskItems = [];

        taskListElement.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const isChecked = li.querySelector('input[type="checkbox"]').checked;
            taskItems.push({ text: taskText, checked: isChecked });
        });

        tasks[category] = taskItems;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage and populate the lists:
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

    for (const category in tasks) {
        const taskItems = tasks[category];
        const taskList = document.getElementById(`${category}-tasks`).querySelector('ul');

        if (taskList) {
            taskList.innerHTML = ''; // Clear existing tasks
            taskItems.forEach(task => {
                const newTask = document.createElement('li');
                newTask.innerHTML = `
                    <input type="checkbox" ${task.checked ? 'checked' : ''}>
                    <span>${task.text}</span>
                `;
                taskList.appendChild(newTask);
            });
        }
    }
}
// Todolist js, end