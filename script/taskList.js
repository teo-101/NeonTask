const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const removeTaskBtn = document.getElementById('removeTask');
let tasks = []; // Used for this session and to update localStorage

// Function is called when body loads
function GetTasks() {
  const storedTasks = localStorage.getItem('storedTasks');

  // Parses the data saved in local storage as JSON to an js array of strings
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  let index=0;
  // Updates the list with the data from local storage
  tasks.forEach(task => {
    taskList.innerHTML += `<p class="tasks" value="${index}">${task}</p>`;
    index += 1;
  });

}

// Adds a new task
addTaskBtn.addEventListener("click", () => {
  // Create an html object and setting attributes
  let inputField = document.createElement('input');
  inputField.setAttribute('id', 'inputField');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'Enter new task');

  // Making the element a children of the taskList
  taskList.appendChild(inputField);
  inputField.focus();

  // When enter is pressed the value from the input is added to localStorage and pages is refreshed removing #inputField
  inputField.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
      let task = inputField.value.trim();

      if (task !== '') {
        // localStorage update
        tasks.push(task);
        localStorage.setItem('storedTasks', JSON.stringify(tasks));

        // Refresh page to update UI
        location.reload();
      }
    }
  });

});


let removeMode = false;

removeTaskBtn.addEventListener("click", () => {
  if (removeMode)
    removeMode = false;
  else
    removeMode = true;
});

// Removes a task by clicking on it from the task list
taskList.addEventListener("click", (event) => {
  // If its a task and remove mode is active
  if (event.target.classList.contains('tasks') && removeMode === true) {
    let value = parseInt(event.target.getAttribute('value')); // Index of task

    tasks.splice(value, 1); // Deletes from array

    localStorage.setItem('storedTasks', JSON.stringify(tasks)); // localStorage update

    event.target.remove(); // Remove from UI

  }

  //COMING SOON MARK COMPLETED
  if (event.target.classList.contains('tasks') && removeMode === false) {
    let value = parseInt(event.target.getAttribute('value')); // Index of task

    tasks.splice(value, 1); // Deletes from array

    localStorage.setItem('storedTasks', JSON.stringify(tasks)); // localStorage update

    event.target.remove(); // Remove from UI

  }
  
});

