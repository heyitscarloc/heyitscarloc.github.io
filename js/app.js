
function toggleCheckboxText() {
  let completedDate;
  // update UI
  if(event.target.checked){
    event.target.parentElement.style.textDecoration= "line-through";
    completedDate = Date.now();
  }else{
    event.target.parentElement.style.textDecoration= "none";
    completedDate = null;
  }

  //update task
  s_updateTask(event.target.id, completedDate);

  refreshTasks();
}

function deleteTask() {
  let itemDiv = event.target.closest(".item");
  let checkboxHtml = itemDiv.querySelector("input");
  s_deleteTask(checkboxHtml.id);
  refreshTasks();
}

function loadAll() {

  loadPlaceholderText();
  refreshTasks();

  //self.setInterval(refreshTasks, 5000);
}

function loadPlaceholderText() {
  // array of potential placeholders
  var randomPlaceholderText = ["Take a walk", "Fill cat's food bowl", "Go to doctors appointment", "Do the laundry", "Replace fish tank water", "Accept RSVP for event", "Replace tires", "Rake the leaves", "Buy milk", "Get high" ];

  //selected placeholder text using math api
  var pickedPlaceholderText = randomPlaceholderText[Math.floor(Math.random() * 10)];

  //get add task text
  var selectedControl = document.getElementById("addTaskText");

  //set random text to attribute
  selectedControl.attributes.placeholder.value = pickedPlaceholderText;

}

function saveTask() {
   let addTaskForm = document.querySelector("#add-task-form");
  // do work only if we need to
  if(!addTaskForm.checkValidity()) {
    addTaskForm.classList.replace("needs-validation", "was-validated");

    return false;
  }

  addTaskForm.classList.replace("was-validated", "needs-validation");
  
  let taskText = document.getElementById("addTaskText");
  let savedTask = s_saveTask(taskText.value, Date.now(), null);
  document.getElementById("addTaskText").value = "";

  refreshTasks();
}


function showHideNothingClass(tasks) {
  var x = document.querySelector(".nothing");
  if (tasks.length > 0) {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function refreshTasks() {
  // clear all items
  document.querySelectorAll(".item").forEach(item => item.remove());

  let tasks = s_getAllTasks();
  
  // refresh task list
  for(let i=0; i < tasks.length; i++) {
    document.getElementById("list").innerHTML += objectToDivItem(tasks[i].task, tasks[i].createdDate, tasks[i].completedDate);
  }
  //toggle there's nothing todo
  showHideNothingClass(tasks);
}

function clearAll() {
  s_clearAll();
  // clear all items
  document.querySelectorAll(".item").forEach(item => item.remove());
  document.getElementById("list").innerHTML += emptyItem();
}

// html to update
function objectToDivItem(task, createdDate, completedDate) {
  return `<div class='card shadow-sm p-4 mb-4 bg-white'><div class='card-body item' style=${completedDate !== null ? 'text-decoration:line-through' : ''}><label><input id='${createdDate}' class='pad' type='checkbox' onclick='toggleCheckboxText()' ${completedDate !== null ? 'checked' : ''} >${task}</label><button onclick='deleteTask()'>delete</button></div></div>`;
}

function emptyItem() {
  return `<div class="alert alert-primary nothing">There's nothing todo!</div>`;
}

