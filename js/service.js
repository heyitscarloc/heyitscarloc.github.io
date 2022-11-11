function s_saveTask(taskText, timestamp, completedDate) {
    //convert to object
    let task = convertToTask(taskText, timestamp, completedDate);

    //fetch all tasks
    var tasks = d_getAllTasks();

    //append tasks to existing tasks
    tasks.push(task);

    //save all tasks
    d_saveAllTasks(tasks);

    return task;
}

function s_updateTask(taskId, completedDate) {
    var allTasks = d_getAllTasks();
    var taskToUpdate = allTasks.findIndex(t => t.createdDate == taskId);
    
    allTasks[taskToUpdate].completedDate = completedDate;

    d_saveAllTasks(allTasks);
}

function s_deleteTask(taskId) {
    var allTasks = d_getAllTasks();
    var taskToDelete = allTasks.findIndex(t => t.createdDate == taskId);
    
    allTasks.splice(taskToDelete, 1);

    d_saveAllTasks(allTasks);
}

function s_getAllTasks() {
    return d_getAllTasks();
}

function s_clearAll() {
    d_clearAll();
}

function convertToTask(taskText, timestamp, completedDate) {
    const singleTask = {
        task:taskText,
        createdDate:timestamp,
        completedDate:completedDate
    }

    return singleTask;
}