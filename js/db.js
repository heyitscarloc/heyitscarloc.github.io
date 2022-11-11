var global_StorageName = 'myTasks';

function d_getAllTasks() {
    let retrievedTasks = JSON.parse(localStorage.getItem(global_StorageName));

    return Array.isArray(retrievedTasks) ? retrievedTasks : [];
}

function d_saveAllTasks(tasks) {
    localStorage.setItem(global_StorageName, JSON.stringify(tasks));
}

function d_clearAll() {
    localStorage.setItem(global_StorageName, null);
}