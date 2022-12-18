function bindSwipeEvents(lastAppendedItem) {
    lastAppendedItem.addEventListener("touchstart", (e) => {
      var currentTouch = e.changedTouches[0];
  
      //store current touch x postion
      sessionStorage.setItem("startX", currentTouch.clientX);
    });
  
    lastAppendedItem.addEventListener("touchmove", (e) => {
  
      var movedX = e.changedTouches[0].clientX;
      var startX = parseInt(sessionStorage.getItem("startX"));
  
      //allow to swipe right
      let distanceMoved = startX - movedX;
      sessionStorage.setItem("distanceMoved", distanceMoved);
      findTopItem(e).style["right"] = distanceMoved + "px" ;
  
    });
  
    lastAppendedItem.addEventListener("touchend", (e) => {
      let topItem = findTopItem(e);
      topItem.style["right"] = "0px" ;
      let thresholdDistanceToDelete = 100;
      let totalDistanceMoved = sessionStorage.getItem("distanceMoved");
  
      if(Math.abs(totalDistanceMoved) > thresholdDistanceToDelete) {
        topItem.querySelector("button.delete").click();
      }
    });
  }