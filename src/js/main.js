// Initialize Tasks and LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTaskIndex = null;

// Get elements from HTML
const todoTasks = document.getElementById("todoTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const completedTasks = document.getElementById("completedTasks");

const todoCount = document.getElementById("todoCount");
const inProgressCount = document.getElementById("inProgressCount");
const completedCount = document.getElementById("completedCount");

const taskModal = document.getElementById("taskModal");
const addTaskModal = document.getElementById("addTaskModal");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const statusSelect = document.getElementById("status");
const addTaskBtn = document.getElementById("addTaskBtn");
const createTaskBtn = document.getElementById("createTaskBtn");
// Opening the Add Task modal
addTaskBtn.addEventListener("click", () => {
    addTaskModal.style.display = "flex";
});

// Create a new task
createTaskBtn.addEventListener("click", () => {
    const taskName = document.getElementById("newTaskName").value;
    const taskDescription = document.getElementById("newTaskDescription").value;

    if (taskName) {
        const newTask = {
            name: taskName,
            description: taskDescription,
            status: "Todo",
            subtasks: [],
        };

        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        closeModals();
    }
});

// Save tasks to localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the page
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
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.subtasks.length} subtasks</p>
        `;
        taskCard.addEventListener("click", () => openTaskModal(index));

        if (task.status === "Todo") {
            todoTasks.appendChild(taskCard);
            todoCountValue++;
        } else if (task.status === "In Progress") {
            inProgressTasks.appendChild(taskCard);
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

// Open task details modal with options menu
function openTaskModal(index) {
    selectedTaskIndex = index;
    const task = tasks[index];

    taskTitle.textContent = task.name;
    taskDescription.textContent = task.description;
    statusSelect.value = task.status;

    taskModal.style.display = "flex";

}



// Save edited task
function saveChanges() {
    const newTitle = editTitleInput.value;
    const newDescription = editDescriptionInput.value;

    tasks[selectedTaskIndex].name = newTitle;
    tasks[selectedTaskIndex].description = newDescription;

    updateLocalStorage();
    renderTasks();
    closeModals();
}

// Delete task
function deleteTask() {
    tasks.splice(selectedTaskIndex, 1);
    updateLocalStorage();
    renderTasks();
    closeModals();
}

// Close modals
function closeModals() {
    taskModal.style.display = "none";
    addTaskModal.style.display = "none";
    document.getElementById('editModal').style.display = "none";
}

// Close all modals when clicking close button
document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", closeModals);
});

// Initial render
renderTasks();