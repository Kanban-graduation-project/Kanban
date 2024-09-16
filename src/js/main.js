// Initialize tasks from localStorage (if present), otherwise create an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

addTaskBtn.addEventListener('click', function () {
    addTaskModal.style.display = 'flex';
});

// Close modal when clicking outside or on a close button
window.onclick = function(event) {
    if (event.target === addTaskModal) {
        addTaskModal.style.display = 'none';
    }
};


// Opening the Add Task modal
addTaskBtn.addEventListener("click", () => {
    addTaskModal.style.display = "flex";
});

// Close modal when clicking on 'X'
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
            status: "Todo", // All new tasks are added to "To Do"
        };

        tasks.push(newTask);
        updateLocalStorage(); // Save the new task to localStorage
        renderTasks(); // Re-render tasks to display the new task
        closeModals(); // Close the modal after adding the task
    }
});

// Function to close all modals
function closeModals() {
    addTaskModal.style.display = "none";
    document.getElementById('editModal').style.display = "none"; // If you have an edit modal
}

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
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            
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
 
document.addEventListener('DOMContentLoaded', () => {
    const taskDetailsModal = document.getElementById('taskDetails');
    const closeModal = document.querySelector('.close');
    const statusSelect = document.getElementById('status');
    const saveStatusButton = document.getElementById('saveStatus');
  
    // Example tasks
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'todo' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'inprogress' },
      { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'completed' }
    ];
  
    function renderTasks() {
      // Clear existing tasks
      document.querySelectorAll('.column').forEach(column => column.innerHTML = '<h2>' + column.id.charAt(0).toUpperCase() + column.id.slice(1) + '</h2>');
  
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerText = task.title;
        taskElement.dataset.id = task.id;
        document.getElementById(task.status).appendChild(taskElement);
  
        taskElement.addEventListener('click', () => showTaskDetails(task));
      });
    }
  
    function showTaskDetails(task) {
      document.getElementById('taskTitle').innerText = task.title;
      document.getElementById('taskDescription').innerText = task.description;
      statusSelect.value = task.status;
  
      taskDetailsModal.style.display = 'block';
  
      saveStatusButton.onclick = () => {
        const newStatus = statusSelect.value;
        task.status = newStatus;
        renderTasks(); // Re-render tasks
        closeTaskDetails();
      };
    }
  
    function closeTaskDetails() {
      taskDetailsModal.style.display = 'none';
    }
  
    closeModal.onclick = closeTaskDetails;
  
    window.onclick = (event) => {
      if (event.target === taskDetailsModal) {
        closeTaskDetails();
      }
    };
  
    renderTasks(); // Initial render of tasks
  });
  
// Close modal
function closeModals() {
    addTaskModal.style.display = "none";
}

// Initial render of tasks (when the page loads)
document.addEventListener("DOMContentLoaded", () => {
renderTasks();
});

