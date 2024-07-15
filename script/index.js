const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const removeTaskBtn = document.getElementById('removeTask');

// Constructor function
function Task(index, text, isDone = false) {
  this.index = index;
  this.text = text;
  this.isDone = isDone;
}

// Array of Task Objects
let tasks = [];
let removeMode = false;

// Function is called when body loads
function GetTasks() {
  const storedTasks = localStorage.getItem('storedTasks');

  // Parses the data saved in local storage as JSON to an js array of strings
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  // Updates the list with the data from local storage
  taskList.innerHTML = '';
  tasks.forEach(task => {
    // If task is done add .done css class
    taskList.innerHTML += `
      <li class="tasks ${task.isDone ? 'done' : ''}" data-index="${task.index}" title="${task.isDone ? 'Marked as done' : 'Task in progress'}">
        ${task.text}
      </li>`;
  });

}

// Adding new task
addTaskBtn.addEventListener("click", () => {
  // Resetting remove mode
  removeMode = false;
  removeTaskBtn.classList.remove('active');

  // Adding class for styling
  addTaskBtn.classList.add('active');

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
      let task = inputField.value.trim(); // Remove useless spaces

      if (task !== '') {
        // localStorage update
        tasks.push(new Task(tasks.length, task)); // Construct a new obj
        localStorage.setItem('storedTasks', JSON.stringify(tasks));

        // Refresh UI
        inputField.remove();
        addTaskBtn.classList.remove('active');
        GetTasks();
      }
    }
  });
});

// Toggle remove mode
removeTaskBtn.addEventListener("click", () => {
  removeMode = !removeMode;
  if (removeMode) {
    removeTaskBtn.classList.add('active');
    addTaskBtn.classList.remove('active');
    inputField.remove();
  }
  else {
    removeTaskBtn.classList.remove('active');
  }
});

// Actions on tasks
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains('tasks') && !event.target.classList.contains('done') && !removeMode) { // Mark as done
    const i = parseInt(event.target.getAttribute('data-index'));
    tasks[i].isDone = true;
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
    GetTasks();
  }
  else if (event.target.classList.contains('tasks') && event.target.classList.contains('done') && !removeMode) { // Unmark
    const i = parseInt(event.target.getAttribute('data-index'));
    tasks[i].isDone = false;
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
    GetTasks();
  }
  else if (event.target.classList.contains('tasks') && removeMode) { // Remove task
    const i = parseInt(event.target.getAttribute('data-index'));
    tasks.splice(i, 1);
    event.target.remove();
    tasks.forEach((task, index) => {
      task.index = index;
    });
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
    GetTasks();
  }
});