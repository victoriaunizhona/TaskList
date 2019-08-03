//Define UI Vars

const form = document.querySelector("#task-form");
const taksList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove taks event
  taksList.addEventListener("click", removeTask);

  // Clear task event
  clearBtn.addEventListener("click", clearTasks);

  // Filter task even
  filter.addEventListener("keyup", filterTasks);

  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
};

// Get Tasks from LS

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks")); // returns array of values from the Local Storage and removes the quotes
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");

    // Add a class
    li.className = "collection-item";

    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');
    // Add a class
    link.className = 'delete-item secondary-content';

    // Add icon hmtl
    link.innerHTML = "<i class='fa fa-times'></i>";


    // Append the link to the li
    li.appendChild(link);


    // Append to UL

    taksList.appendChild(li);

  })
}

// Add task

function addTask(e) {

  if (taskInput.value === "") {
    alert("Add a task!")
  }

  // Create li element
  const li = document.createElement("li");

  // Add a class
  li.className = "collection-item";

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');
  // Add a class
  link.className = 'delete-item secondary-content';

  // Add icon hmtl
  link.innerHTML = "<i class='fa fa-times'></i>";


  // Append the link to the li
  li.appendChild(link);


  // Append to UL

  taksList.appendChild(li);


  // Store in LS
  storeTaskInLocalStorage(taskInput.value); // add to LocalStorage

  // Clear the Input
  taskInput.value = "";

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks")); // returns array of values from the Local Storage and removes the quotes
  }

  tasks.push(task); // adds new value to the end of the array

  localStorage.setItem("tasks", JSON.stringify(tasks)); // adds to local storage all the elements including the new one. 
  // LocalStorage stores things in quotes.
  // JSON.stingify() to convert it to “[1, 2, 3]”. 
  // JSON.parse() to convert it back to normal array which is [1, 2, 3].
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(tasksItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks")); // returns array of values from the Local Storage and removes the quotes
  }

  tasks.forEach(function (task, index) {
    if (tasksItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Clear tasks

function clearTasks() {
  taksList.innerHTML = "";

  clearTasksFromLocalStorage();
}

// Clear tasks from local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";

    }
  })
}