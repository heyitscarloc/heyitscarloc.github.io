
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