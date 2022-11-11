function s_saveTask(taskText, timestamp, completedDate) {
    //convert to object
    let task = convertToTask(taskText, timestamp);

    //fetch all tasks
    var tasks = d_getAllTasks();

    //append tasks to existing tasks
    tasks.push(task);

    //save all tasks
    d_saveAllTasks(tasks);

    return task;
}

function s_getAllTasks() {
    return d_getAllTasks();
}

function convertToTask(taskText, timestamp, completedDate) {
    const singleTask = {
        task:taskText,
        createdDate:timestamp,
        completedDate:completedDate
    }

    return singleTask;
}