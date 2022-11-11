
function toggleCheckboxText() {
  if(event.target.checked){
  event.target.parentElement.style.textDecoration= "line-through";
  }else{
    event.target.parentElement.style.textDecoration= "none";
  }
}

function myFunction() {
  var x = document.getElementById("hide");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
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

function saveTask(value) {
  let taskText = document.getElementById("addTaskText").value;

  let savedTask = s_saveTask(taskText, Date.now());

  // add task to UI
  console.log(savedTask);

}

