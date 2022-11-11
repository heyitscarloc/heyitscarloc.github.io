function s_saveTask(taskText, timestamp) {
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

function convertToTask(taskText, timestamp) {
    const singleTask = {
        task:taskText,
        createdDate:timestamp
    }

    return singleTask;
}