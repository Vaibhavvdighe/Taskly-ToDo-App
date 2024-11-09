//features yet to be implemented
//1. Cancelling the current task and generating new task 
//2. Task Editing
//3. Transitions and Animations
//add cursor style to pointer on every mouseover event





const navbar = document.querySelector("nav");
const main = document.querySelector("main");
const start = document.querySelector(".start");
const form = document.querySelector(".input-form");
const cancel = document.querySelector(".cancel");
let relocate = false; //a flag which checks if the start button has relocated, which will later help the button to act on hover effect
const incomplete_task = document.querySelector(".incomplete-tasklist");
const complete_task = document.querySelector(".complete-tasklist");
const theme = document.querySelector('.theme');
let currentTheme = 'dark';

let formOpen = false; 

//This is where the execution of the whole project starts
start.addEventListener("click", async () => {
  relocateStartButton();
  formOpen = true;
  start.style.pointerEvents="none";
  form.style.display = "flex";
  const data_object = await inputInfo();
  form.style.display = "none";
  
  addTask(data_object);
});

function inputInfo() { 
  cancel.addEventListener("click", (e) => { 
    e.preventDefault();
    formOpen=false;
    start.style.pointerEvents="all";
    form.style.display = "none";
    // start.style.visibility = "visible";
    if(taskCount==0) {
      initialLayout()
    }
  });
  
  return new Promise((resolve, reject) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      formOpen=false;
      start.style.pointerEvents="all";
      const data = new FormData(e.target);
      data_object = Object.fromEntries(data); 
      resolve(data_object);
    });
  });  
}

let taskCount = 0;
//Whenever a new task is submitted by the user, this function will create a new list item
function addTask(data) {
  taskCount++;

  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.id = `checkbox${taskCount}`;

  const task = document.createElement('li');
  task.id = `task${taskCount}`;

  const taskHeadline = document.createElement('span');
  taskHeadline.className="taskHeadline";
  taskHeadline.innerHTML = `${data.headline}`;

  const taskDesc = document.createElement('p');
  taskDesc.className = "taskDescription";
  taskDesc.innerHTML = `${data.description}`;

  const taskPriority = document.createElement('p');
  taskPriority.className = "taskPriority";
  taskPriority.innerHTML = `Priority: ${data.priority}`;

  const taskButtons = document.createElement('div');
  taskButtons.className="taskButtons";

  // const editButton = document.createElement('button');
  // editButton.className = "editButton";
  // editButton.id = `task${taskCount}`;
  // editButton.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl"></i>`;

  const deleteButton = document.createElement('button');
  deleteButton.className = "deleteButton";
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can fa-xl"></i>`;

  task.appendChild(checkbox);
  task.appendChild(taskHeadline);
  task.appendChild(taskDesc);
  task.appendChild(taskPriority);
  task.appendChild(taskButtons);
  // taskButtons.appendChild(editButton); 
  taskButtons.appendChild(deleteButton);

  incomplete_task.appendChild(task);

  taskDesc.style.visibility="hidden";
  taskPriority.style.visibility="hidden";


  task.addEventListener('mouseover', ()=> {
      task.style.height="10vh";
      taskDesc.style.visibility="visible";
      taskPriority.style.visibility="visible";
      task.style.transitionDuration = "500ms";
  })

  task.addEventListener('mouseout', ()=> {
      task.style.height="6vh";
      taskDesc.style.visibility="hidden";
      taskPriority.style.visibility="hidden";
  })

  // editButton.addEventListener('click', async () =>{
  //   editTask(task);
  // })

  deleteButton.addEventListener('click',()=> {
    removeTask(task);
  })

  checkbox.addEventListener('click', ()=> {
    taskCompleted(checkbox.parentElement);
  }) 
}

//This function edits the task info if the user wants to make any changes in the current task 
// async function editTask(old_task) {
//   form.style.display = "flex";
//   const new_task_data_object = await inputInfo();
//   form.style.display = "none";
//   let oldTask = document.querySelector(old_task);
//   oldTask.taskHeadline.innerHTML = `${new_task_data_object.headline}`;
//   oldTask.taskDesc.innerHTML = `${new_task_data_object.description}`;
//   oldTask.taskPriority.innerHTML = `Priority: ${new_task_data_object.priority}`;
// }

//This function removes the task from the display whenever the user uses the delete button to delete the task
function removeTask(task) {
  incomplete_task.removeChild(task);
  taskCount--;
  
  if(taskCount==0) {
    initialLayout();
  }
}

//This function will move the task to the bottom in completed task section
function taskCompleted(task) {
  taskCount--;
  
  complete_task.appendChild(task);
  task.style.backgroundColor="rgb(110, 81, 71)";
  task.style.pointerEvents = "none";

  let btn = task.querySelector(`.deleteButton`);
  btn.style.pointerEvents="auto";

  btn.addEventListener('click', ()=> {
    complete_task.removeChild(task);
    if(taskCount==0) {
      initialLayout();
    }
  })
}

//This code is responsible for making changes in the webpage when the user wants to change the theme
theme.addEventListener('click', ()=> {
if(currentTheme=='dark') {
  currentTheme='light';
  document.body.style.backgroundColor = "white";
  main.style.backgroundColor="rgb(150, 150, 150)";
  navbar.style.backgroundColor="rgb(150, 150, 150)";
  theme.style.backgroundColor = "darkgrey";
  theme.style.color="black";
}
else if(currentTheme=='light'){
  currentTheme = 'dark';
  document.body.style.backgroundColor = "black";
  main.style.backgroundColor="rgb(25, 25, 25)";
  navbar.style.backgroundColor="rgb(25, 25, 25)";
  theme.style.backgroundColor = "black";
  theme.style.color="rgb(91, 91, 91)";
}
});

//Creates the initial layout of the webpage when there are no active tasks 
function initialLayout() {
  start.style.transform = "translate(0, 0)";
  start.style.height = "100px";
  start.style.width = "90px";
  start.style.fontSize = "60px";
  relocate = true;

  start.addEventListener("mouseover", () => {
    start.style.height = "110px";
    start.style.width = "100px";
    start.style.fontSize = "70px";
  });

  start.addEventListener("mouseout", () => {
    start.style.height = "100px";
    start.style.width = "90px";
    start.style.fontSize = "60px";
  });
}

//Relocates the start button to the initial position
function relocateStartButton() {
  start.style.transform = "translate(-24vw, -6vh)";
  start.style.height = "40px";
  start.style.width = "60px";
  start.style.fontSize = "20px";
  relocate = true;

  start.addEventListener("mouseover", () => {
    start.style.height = "50px";
    start.style.width = "70px";
    start.style.fontSize = "30px";
  });

  start.addEventListener("mouseout", () => {
    start.style.height = "40px";
    start.style.width = "60px";
    start.style.fontSize = "20px";
  });
}