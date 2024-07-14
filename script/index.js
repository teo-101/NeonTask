const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const removeTaskBtn = document.getElementById('removeTask');

function Task(index, text, isDone = false) {
  this.index = index;
  this.text = text;
  this.isDone = isDone;
}

let tasks = [];
let removeMode = false;

// Function is called when body loads
function GetTasks() {
  const storedTasks = localStorage.getItem('storedTasks');

  // Parses the data saved in local storage as JSON to an js array of strings
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  let index=0;
  taskList.innerHTML = '';
  // Updates the list with the data from local storage
  tasks.forEach(task => {
    taskList.innerHTML += `
      <p class="tasks ${task.isDone ? 'done' : ''}" data-index="${task.index}">
        ${task.text}
      </p>`;
  });

}

addTaskBtn.addEventListener("click", () => {
  removeMode = false;
  removeTaskBtn.style.backgroundColor = 'var(--lightBlue';
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
        tasks.push(new Task(tasks.length, task));
        localStorage.setItem('storedTasks', JSON.stringify(tasks));

        // Refresh page to update UI
        inputField.remove();
        GetTasks();
      }
    }
  });
});

removeTaskBtn.addEventListener("click", () => {
  removeMode = !removeMode;
  removeTaskBtn.style.backgroundColor = removeMode ? 'red' : 'var(--lightBlue)';
});

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains('tasks') && !event.target.classList.contains('done') && !removeMode) {
    const i = parseInt(event.target.getAttribute('data-index'));
    tasks[i].isDone = true;
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
    GetTasks();
  }
  else if (event.target.classList.contains('tasks') && event.target.classList.contains('done') && !removeMode) {
    const i = parseInt(event.target.getAttribute('data-index'));
    tasks[i].isDone = false;
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
    GetTasks();
  }
  else if (event.target.classList.contains('tasks') && removeMode) {
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