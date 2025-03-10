document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname; // Gets the current page's path

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname; // Gets the link's path
        if (linkPath === currentPage || (currentPage === '/' && linkPath === '/index.html') || (currentPage === '/index.html' && linkPath === '/index.html')) {
            link.classList.add('active-page'); // Add the active-page class
        }
    });


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
                const taskId = `${category}-task-${Date.now()}`; // Generate a unique ID
                newTask.innerHTML = `
                <label>
                    <input type="checkbox" name="${category}-task" id="${taskId}">
                    <span>${taskDescription}</span>
                </label>
                <button class="edit-task" aria-label="Edit task">Edit</button>
                <button class="delete-task" aria-label="Delete task">Delete</button>
                `;
                newTask.classList.add("task-item"); // Add CSS class
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

    taskLists.addEventListener('click', (event) => { // Added click event listener for delete
        if (event.target.classList.contains('delete-task')) {
            const taskItem = event.target.parentElement;
            taskItem.remove();
            saveTasksToLocalStorage();// Update local storage after deletion
        } else if (event.target.classList.contains('edit-task')) {
            const taskItem = event.target.parentElement;
            const taskSpan = taskItem.querySelector('span');
            const taskText = taskSpan.textContent;

        // Replace span with input field
        taskSpan.outerHTML = `<input type="text" class="edit-input" value="${taskText}">`;
        const editInput = taskItem.querySelector('.edit-input');
        editInput.focus();

        // Replace edit button with save button.
        event.target.outerHTML = '<button class="save-task" aria-label="Save task">Save</button>';
    } else if (event.target.classList.contains('save-task')){
        const taskItem = event.target.parentElement;
        const editInput = taskItem.querySelector('.edit-input');
        const newText = editInput.value;

        //replace input with span.
        editInput.outerHTML = `<span>${newText}</span>`;

        //replace save button with edit button.
        event.target.outerHTML = '<button class="edit-task" aria-label="Edit task">Edit</button>';

        saveTasksToLocalStorage();
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
            const spanElement = li.querySelector('span'); // Get the span element
            if (spanElement) { // Check if the span element exists
                const taskText = spanElement.textContent;
                const isChecked = li.querySelector('input[type="checkbox"]').checked;
                const isCompleted = spanElement.classList.contains('completed');
                taskItems.push({ text: taskText, checked: isChecked, completed: isCompleted });
            }
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
            taskItems.forEach((task, index) => { // Include 'index' as a parameter
                const taskId = `${category}-task-${Date.now() + index}`; // Generate a unique ID
                const newTask = document.createElement('li');
                newTask.innerHTML = `
                    <label>
                        <input type="checkbox" ${task.checked ? 'checked' : ''} name="${category}-task" id="${taskId}">
                        <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
                    </label>
                    <button class="edit-task" aria-label="Edit task">Edit</button>
                    <button class="delete-task" aria-label="Delete task">Delete</button>
                `;
                newTask.classList.add("task-item"); // Add CSS class
                taskList.appendChild(newTask);
            });
        }
    }
}
// Todolist js, end





 // Shopping List JavaScript

 const shoppingInput = document.getElementById('new-shopping-item-input');
 const addButton = document.getElementById('add-shopping-item-button');
 const shoppingList = document.getElementById('shopping-items').querySelector('ul');

    // Function to save shopping list to local storage
    function saveShoppingList() {
        const items = [];
        shoppingList.querySelectorAll('li').forEach(item => {
            const label = item.querySelector('label');
            const checkbox = item.querySelector('input[type="checkbox"]');
            items.push({
                text: label.textContent,
                completed: checkbox.checked
            });
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    // Function to load shopping list from local storage
    function loadShoppingList() {
        const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
        savedItems.forEach(item => {
            createShoppingItem(item.text, item.completed);
        });
    }

    // Function to create a new shopping list item
    function createShoppingItem(itemText, completed = false) {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        const label = document.createElement('label');
        label.textContent = itemText;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-task');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-task');
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-task');
        saveButton.style.display = 'none'; // Initially hidden


        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(editButton);
        listItem.appendChild(saveButton);
        listItem.appendChild(deleteButton);
        shoppingList.appendChild(listItem);

        // Event listener for checkbox
        checkbox.addEventListener('change', () => {
            label.classList.toggle('completed', checkbox.checked);
            saveShoppingList();
        });

        // Event listener for delete button
        deleteButton.addEventListener('click', () => {
            shoppingList.removeChild(listItem);
            saveShoppingList();
        });

        // Event listener for edit button
        editButton.addEventListener('click', () => {
            label.contentEditable = true;
            label.focus();
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        });

        // Event listener for save button
        saveButton.addEventListener('click', () => {
            label.contentEditable = false;
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
            saveShoppingList();
        });
    }


    // Event listener for add button
    addButton.addEventListener('click', () => {
        const itemText = shoppingInput.value.trim();
        if (itemText !== '') {
            createShoppingItem(itemText);
            shoppingInput.value = '';
            saveShoppingList();
        }
    });

    // Event listener for enter key
    shoppingInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // Load shopping list on page load
    loadShoppingList();
