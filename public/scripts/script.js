document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname; // Gets the current page's path

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname; // Gets the link's path
        if (linkPath === currentPage) {
            link.classList.add('active-page'); // Add the active-page class
        }
    });


// togglebutton js start
const toggleBtn = document.querySelector(".toggle-btn");
const body = document.body;
const lockIcon = document.querySelector(".icon i");

    // Function to set the icon based on dark mode class
    function setIcon() {
        if (body.classList.contains("dark-mode")) {
            lockIcon.classList.replace("ri-moon-fill", "ri-sun-line");
        } else {
            lockIcon.classList.replace("ri-sun-line", "ri-moon-fill");
        }
    }

    // Set initial icon state immediately
    setIcon();

    // Check local storage on page load.
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        toggleBtn.classList.add('active');
        setIcon(); // Update icon based on local storage
    }

    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("active");
        body.classList.toggle("dark-mode");
        setIcon(); // Update icon after toggle

        // Save preference to local storage.
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });





//SnowAnimation js start

// Check if the snow-container exists before trying to use it
if (window.location.pathname === '/index.html') {
const snowContainer = document.querySelector(".snow-container");

if (snowContainer) {
    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");

        // Random horizontal position
        snowflake.style.left = Math.random() * window.innerWidth + "px";

        // Slower fall speed (10s - 15s)
        const fallDuration = Math.random() * 5 + 10; // Between 10s and 15s

        // Random sway speed (matching fall speed for smooth motion)
        const swayDuration = fallDuration * 0.8;

        // Random sway direction
        const swayDirection = Math.random() < 0.5 ? -1 : 1;
        snowflake.style.setProperty("--sway-direction", swayDirection);
        snowflake.style.setProperty("--sway-speed", `${swayDuration}s`);

        // Apply animation dynamically
        snowflake.style.animation = `fall ${fallDuration}s linear forwards, sway var(--sway-speed) ease-in-out infinite alternate`;

        // Random size
        const size = Math.random() * 5 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        // Varying opacity
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;

        snowContainer.appendChild(snowflake);

        // Remove after full fall duration
        setTimeout(() => {
            snowflake.remove();
        }, fallDuration * 1000);
    }

    // Create a new snowflake every 100ms
    setInterval(createSnowflake, 100); 
} else {
    console.log("Snow container not found on this page.");
}
}


// Falling Objects JS Start


// Check the current page URL and only run the falling objects script on the correct page
if (window.location.pathname === "/pages/lists.html") {
    const fallContainer = document.querySelector(".falling-container");

    if (fallContainer) {
        function createFallingObject() {
            const obj = document.createElement("img");
            obj.classList.add("falling-object");

            // Random horizontal position
            obj.style.left = Math.random() * window.innerWidth + "px";

            // Choose a random image (array of image paths)
            const images = ["../img/dandelion-1-50pxheight.png", "../img/dandelion-2-50pxheight.png"];
            obj.src = images[Math.floor(Math.random() * images.length)];

            // Random fall speed (15s - 25s)
            const fallDuration = Math.random() * 10 + 15;
            const swayDuration = fallDuration * 0.8;

            // Apply the animation (falling & swaying + rotation)
            obj.style.animation = `fallAndSway ${fallDuration}s linear forwards, rotateWind ${fallDuration}s ease-in-out infinite`;

            // Random size for the image
            const size = Math.random() * 30 + 20; // Between 20px and 50px
            obj.style.width = `${size}px`;
            obj.style.height = `${size}px`;

            // Varying opacity
            obj.style.opacity = Math.random() * 0.7 + 0.3;

            // Append the falling object to the container
            fallContainer.appendChild(obj);

            // Remove after full fall duration
            setTimeout(() => {
                obj.remove();
            }, fallDuration * 1000);
        }

        // Run the createFallingObject function every 200ms
        setInterval(createFallingObject, 200);
    } else {
        console.error("Falling container not found!");
    }
}





//Date and time js
if (window.location.pathname === "/index.html") {
function updateDateTime() {
    const now = new Date();

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, dateOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

    const dateSpan = document.getElementById("date");
    const timeSpan = document.getElementById("time");

    // Check if elements exist before updating
    if (dateSpan && timeSpan) {
        dateSpan.innerHTML = `<i class="ri-calendar-line"></i> ${formattedDate}`;
        timeSpan.innerHTML = `<i class="ri-clock-line"></i> ${formattedTime}`;
    } else {
        // Handle the case where the elements are not found
        // For example, you could log a message or do nothing
        console.log("Date or time elements not found on this page.");
    }
}

// Initial display
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);

}



//Weather API js start

// Fetch the API key from the backend
fetch('/api-key')
  .then(response => response.json())
  .then(data => {
    const apiKey = data.apiKey;
    const city = "Tampere"; // Your city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(weatherData => {
        // Check if elements exist before updating them
        const tempElement = document.getElementById("temperature");
        const descElement = document.getElementById("description");
        const windElement = document.getElementById("wind");
        const iconElement = document.getElementById("weather-icon");

        if (tempElement && descElement && windElement && iconElement) {
          const temp = Math.round(weatherData.main.temp);
          const iconCode = weatherData.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const windSpeed = Math.round(weatherData.wind.speed);
          const description = weatherData.weather[0].description;

          tempElement.innerText = `${temp}°C`;
          descElement.innerText = description.charAt(0).toUpperCase() + description.slice(1);
          windElement.innerText = `Wind: ${windSpeed} m/s`;

          // Display the weather icon
          iconElement.src = iconUrl;
          iconElement.style.display = 'inline';
        }
      })
      .catch(error => console.error('Error fetching weather data:', error));
  })
  .catch(error => console.error('Error fetching API key:', error));





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
if (window.location.pathname === '/pages/lists.html') {
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
 const shoppingListElement = document.getElementById('shopping-items'); //get the element

 if(shoppingListElement){ //check if the element exists.
    const shoppingList = shoppingListElement.querySelector('ul'); //only run query selector if the parent element exists.

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
 function createShoppingItem(itemText) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
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
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(saveButton);
    shoppingList.appendChild(listItem);

     // Event listener for checkbox
     checkbox.addEventListener('change', () => {
         label.classList.toggle('completed', checkbox.checked);
         saveShoppingList(); // Save after check/uncheck
     });

     // Event listener for delete button
     deleteButton.addEventListener('click', () => {
         shoppingList.removeChild(listItem);
         saveShoppingList(); // Save after delete
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
            saveShoppingList(); // Save after editing text
        });
    }


 // Event listener for add button
 addButton.addEventListener('click', () => {
     const itemText = shoppingInput.value.trim();
     if (itemText !== '') {
         createShoppingItem(itemText);
         shoppingInput.value = '';
         saveShoppingList(); // Save after adding
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
}

}



//POMODORO TIMER
if (window.location.pathname.includes('timers.html')) {
    const pomodoroContainer = document.querySelector('.pomodoro-container'); // Get the container by class
    const pomodoroDisplay = document.getElementById('pomodoro-display');
    const pomodoroStartButton = document.getElementById('pomodoro-start');
    const pomodoroPauseButton = document.getElementById('pomodoro-pause');
    const pomodoroResetButton = document.getElementById('pomodoro-reset');

let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    pomodoroDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (pomodoroContainer) {
        pomodoroContainer.classList.add('running');
        pomodoroContainer.classList.remove('paused');
    } // Remove this extra }
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
                isRunning = false;
                timeLeft = 25 * 60; // Reset
                updateDisplay();
                alert("Pomodoro complete!"); // Simple alert
            } else {
                updateDisplay();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (pomodoroContainer) { // Check if pomodoroContainer exists
pomodoroContainer.classList.remove('running');
pomodoroContainer.classList.add('paused');
    }
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    if (pomodoroContainer) { // Check if pomodoroContainer exists
pomodoroContainer.classList.remove('running');
pomodoroContainer.classList.remove('paused');
    }
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}

pomodoroStartButton.addEventListener('click', startTimer);
pomodoroPauseButton.addEventListener('click', pauseTimer);
pomodoroResetButton.addEventListener('click', resetTimer);

updateDisplay(); // Initial display

}
});