const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');

let tasks = []; // Used for this session and to update localStorage
let index;

// Function is called when body loads
function GetTasks() {
  const storedTasks = localStorage.getItem('storedTasks');

  // Parses the data saved in local storage as JSON to an js array of strings
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  
  index = tasks.length;

  let i=0;

  // Updates the list with the data from local storage
  tasks.forEach(task => {
    taskList.innerHTML += `<li class="tasks" value="${i}">${task}</li>`;
    i += 1;
  });

}

// Adds a new task
addTaskBtn.addEventListener("click", () => {

  let task = prompt("Enter new task ->");

  if (task) {
    // UI update
    taskList.innerHTML += `<li class="tasks" value="${index}">${task}</li>`

    // localStorage update
    tasks[index] = task;
    index += 1;
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
  }

});

// Removes a task by clicking on it from the task list
taskList.addEventListener("click", (event) => {
  // If its a task
  if (event.target.classList.contains('tasks')) {
    let value = parseInt(event.target.getAttribute('value')); // Index of task

    tasks.splice(value, 1); // Deletes from array

    localStorage.setItem('storedTasks', JSON.stringify(tasks)); // localStorage update

    event.target.remove(); // Remove from UI
  }
  
})

