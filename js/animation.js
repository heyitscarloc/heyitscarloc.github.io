function deleteAnimation(itemToDelete, callBackOnDelete) {

    var deleteAnimation = anime({
        targets: itemToDelete,
        translateX: window.innerWidth,
    });    
}