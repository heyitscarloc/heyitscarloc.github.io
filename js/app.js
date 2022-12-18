
function toggleCheckboxText() {
  let completedDate;

  var labelToUpdate = event.target.closest(".item").querySelector("label");

  // update UI
  if (event.target.checked) {
    labelToUpdate.classList.add("text-decoration-line-through");
    completedDate = Date.now();
  } else {
    labelToUpdate.classList.remove("text-decoration-line-through");
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
  window.addEventListener('focus', refreshTasks);

  //on enter then assume user clicked add
  document.getElementById("addTaskText").addEventListener("keydown", function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("addTaskButton").click();
    }
  });
}

function loadPlaceholderText() {
  // array of potential placeholders
  var randomPlaceholderText = ["Take a walk", "Fill cat's food bowl", "Go to doctors appointment", "Do the laundry", "Replace fish tank water", "Accept RSVP for event", "Replace tires", "Rake the leaves", "Buy milk", "Get high"];

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
  if (!addTaskForm.checkValidity()) {
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
    // append to DOM
    document.getElementById("list").appendChild(objectToDivItem(tasks[i].task, tasks[i].createdDate, tasks[i].completedDate));
    
    // get appended item
    var lastAppendedItem = document.querySelector(".item:last-child");
    bindSwipeEvents(lastAppendedItem);
  }
  //toggle there's nothing todo
  showHideNothingClass(tasks);
}



function findTopItem(e) {
  return e.target.classList.contains("item") ? e.target : e.target.closest(".item");
}

function clearAll() {
  s_clearAll();
  // clear all items
  var items = document.querySelectorAll(".item").forEach(item => item.remove());
  showHideNothingClass(items);
}

// html to update
function objectToDivItem(task, createdDate, completedDate) {
  var clonedEmptyItem = document.querySelector(".empty-item").cloneNode(true);
  clonedEmptyItem.style.display = "block"
  clonedEmptyItem.classList.add("item");
  clonedEmptyItem.classList.remove("empty-item");


  var emptyCheckbox = clonedEmptyItem.querySelector(".empty-checkbox");
  emptyCheckbox.id = createdDate;
  emptyCheckbox.checked = completedDate ? true : false;
  emptyCheckbox.classList.remove("empty-checkbox");

  var emptyLabel = clonedEmptyItem.querySelector(".empty-label");
  emptyLabel.setAttribute("for", createdDate);
  emptyLabel.innerHTML = task;
  
  if(completedDate) {
    emptyLabel.classList.add("text-decoration-line-through");
  }

  emptyLabel.classList.remove("empty-label");
  

  return clonedEmptyItem;
}
