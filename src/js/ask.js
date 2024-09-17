// Initialize tasks from localStorage or create an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Select elements
const addTaskBtn = document.getElementById('addTaskBtn');
const addTaskModal = document.getElementById('addTaskModal');
const closeBtn = document.querySelector(".close");
const createTaskBtn = document.getElementById("createTaskBtn");

const todoTasks = document.getElementById("todoTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const completedTasks = document.getElementById("completedTasks");

const todoCount = document.getElementById("todoCount");
const inProgressCount = document.getElementById("inProgressCount");
const completedCount = document.getElementById("completedCount");

const LI_ELEMENTS = document.querySelectorAll(".li");
const MENU_BOARDS = document.getElementById("menuBoards")
const ADD_MENU_BOARDS = document.getElementById("addMenuBoards")

const DELETE = document.getElementById("delete")
const Dots = document.getElementById("dots")

const editButton = document.getElementById('editButton');

Dots.addEventListener('click', function () {
    DELETE.style.display = 'flex';
});

// Open add task modal
addTaskBtn.addEventListener('click', function () {
    addTaskModal.style.display = 'flex';
});

// Delete task
function deleteTask() {
    tasks.splice(selectedTaskIndex, 1);
    updateLocalStorage();
    renderTasks();
    closeModals();
}

// Opening the Menu Boards
ADD_MENU_BOARDS.addEventListener("click", () => {
    MENU_BOARDS.style.display = "flex";
  });
  
// Close modal when clicking outside or on the close button
window.onclick = function(event) {
    if (event.target === addTaskModal) {
        addTaskModal.style.display = 'none';
    }
};

closeBtn.addEventListener("click", () => {
    addTaskModal.style.display = "none";
});

// Create a new task
createTaskBtn.addEventListener("click", () => {
    const taskName = document.getElementById("newTaskName").value;
    const taskDescription = document.getElementById("newTaskDescription").value;

    if (taskName) {
        const newTask = {
            name: taskName,
            description: taskDescription,
            status: "Todo", // Default status is 'Todo'
        };

        tasks.push(newTask);
        updateLocalStorage(); // Save the new task to localStorage
        renderTasks(); // Re-render tasks to display the new task
        closeModals(); // Close the modal after adding the task
    }
});

// Function to save tasks to localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
    todoTasks.innerHTML = "";
    inProgressTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    let todoCountValue = 0;
    let inProgressCountValue = 0;
    let completedCountValue = 0;

    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.innerHTML = `<h3>${task.name}</h3>`;
        taskCard.addEventListener("click", () => openTaskModal(index));

        if (task.status === "Todo") {
            todoTasks.appendChild(taskCard);
            todoCountValue++;
        } else if (task.status === "In Progress") {
            inProgressTasks.appendChild(taskCard);
            console.log(inProgressTasks)
            inProgressCountValue++;
        } else if (task.status === "Completed") {
            completedTasks.appendChild(taskCard);
            completedCountValue++;
        }
    });

    todoCount.textContent = todoCountValue;
    inProgressCount.textContent = inProgressCountValue;
    completedCount.textContent = completedCountValue;
}

// Open Task Details modal and update task status
function openTaskModal(index) {
    const task = tasks[index];
    // here//
    selectedTaskIndex = index; // Store the index of the selected task
    //done//

    document.getElementById('taskTitle').innerText = task.name;
    document.getElementById('taskDescription').innerText = task.description;

    const statusSelect = document.getElementById('status');
    statusSelect.value = task.status;

    const taskDetailsModal = document.getElementById('taskDetails');
    taskDetailsModal.style.display = 'flex';

    const saveStatusButton = document.getElementById('saveStatus');
    saveStatusButton.onclick = () => {
        task.status = statusSelect.value;
        updateLocalStorage();
        renderTasks();
        taskDetailsModal.style.display = 'none';
    };
}
//HEREE
// Open Task Details modal for editing
function openTaskModal(index) {
    const task = tasks[index];
    selectedTaskIndex = index; // Store the index of the selected task

    document.getElementById('taskTitle').innerText = task.name;
    document.getElementById('taskDescription').innerText = task.description;

    const statusSelect = document.getElementById('status');
    statusSelect.value = task.status;

    const taskDetailsModal = document.getElementById('taskDetails');
    taskDetailsModal.style.display = 'flex';
}
// Add event listener to the Edit button

editButton.addEventListener('click',   
() => { console.log("Edit button clicked!");
    const newTaskName = document.getElementById('taskTitle').value;
    const newTaskDescription = document.getElementById('taskDescription').value;
    const newTaskStatus = document.getElementById('status').value;

    if (newTaskName && newTaskDescription) {
        tasks[selectedTaskIndex] = {
            name: newTaskName,
            description: newTaskDescription,
            status: newTaskStatus
        };
        updateLocalStorage();
        renderTasks();
        closeModals();
    }
});

//DONE

// here//
// Function to delete a task
function deleteTask() {
    tasks.splice(selectedTaskIndex, 1); // Remove the task from the array
    updateLocalStorage();
    renderTasks();
    closeModals();
}
//done//

// Close all modals
function closeModals() {
    addTaskModal.style.display = 'none';
    document.getElementById('taskDetails').style.display = 'none'; // Close task details modal
    document.getElementById('delete').style.display = 'none';
}

// Initial render of tasks when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

LI_ELEMENTS.forEach(LI_ELEMENT => {
    LI_ELEMENT.addEventListener('click', function(){
      LI_ELEMENTS.forEach(LI_ELEMENT => LI_ELEMENT.classList.remove('active'))
      LI_ELEMENT.classList.add('active')
    })
  })