var listOfTask = [];
var id = 1;
var subTaskId = 1;
var taskName = document.getElementById("taskName");
var tasks = document.getElementById("taskList");
var task = document.getElementById("task");
var subTaskName = document.getElementById("subTask");
var subTasks = document.getElementById("subTasks");
var taskId = document.getElementById("taskId");
var subTaskIdCommon = document.getElementById("sub-task-id");
var steps = document.getElementById("add-steps");
var step = document.getElementById("steps");
var taskNameUpdate = document.getElementById("task-name");
var subTaskNameUpdate = document.getElementById("sub-task-name");

/**
 * object with constructor to take have an subtask
 * @param {subtask id to iterate it} id 
 * @param {subtask name} name 
 * @param {array of steps inside a subtask} steps 
 */
function SubTask(id, name, status, steps) { 
    this.id = id;
    this.name = name; 
    this.status = status;
    this.steps = steps;
}

/**
 * Object with constructor to take a task
 * @param {id to get task by unique} id 
 * @param {name to get a tsak name} name 
 * @param {array of subtask} subTaskList 
 */
function Task(id, name, subTaskList) { 
    this.id = id; 
    this.name = name; 
    this.subTaskList = subTaskList;
}

/**
 * Opening an toggle to add a task
 * @param {id of an element to which the function should take care} tabName 
 */
function openTab(tabName) {
    document.getElementById(tabName).className = "toggle-open nav";
}

/**
 * Toggle an nav by adjusting it's width according to need
 * @param {id of an element to toggle a nav bar} tabName 
 */
function toggle(tabName) {
    var toggle = document.getElementById(tabName);
    document.getElementById(tabName).className = (toggle.classList.contains("toggle-open")) ? "nav-small nav" : "toggle-open nav";
}

/**
 * To add a task name after filling a value in 
 *     text box by checking the element through it's event
 */
taskName.addEventListener("keypress", function(action) {
    if((action.keyCode) === 13) {
        var taskValue = taskName.value;
        var subTask = [];
        addTask(taskValue, id);
        if(taskValue) {
          listOfTask.push(
            new Task(id, taskValue, subTask) 
          )
          getTask(id);
          id++;
          taskName.value = "";
        }
    }
});

/**
 * To add a subtask name after filling a value in 
 *     text box by checking the element through it's event
 */
subTaskName.addEventListener("keypress", function(action) {
    if((action.keyCode) === 13) {
        var subTaskValue = subTaskName.value;
        var status = true;
        var step = [];
        listOfTask[getTaskIndex(taskId.textContent)].subTaskList.push(
            new SubTask(subTaskId, subTaskValue, status, step)
        )
        listSubTask(subTaskValue, subTaskId, status);
        subTaskName.value = "";
        subTaskId++;
    }
});

/**
 * To add a steps name inside a subtask by getting a value after filling a value in 
 *     text box by checking the element through it's event
 */
steps.addEventListener("keypress", function(action) {
    if((action.keyCode) === 13) {
        var stepsInput = steps.value;
        var taskIndex = getTaskIndex(taskId.textContent);
        var subTaskIndex = getSubTaskIndex(subTaskIdCommon.textContent, taskIndex);
        listOfTask[taskIndex].subTaskList[subTaskIndex].steps.push (
            stepsInput
        )
        listSteps(stepsInput);
        document.getElementById("add-steps").value = "";
    }
});

/**
 * To update a task name after filling a value in 
 *     text box by checking the element through it's event
 */
taskNameUpdate.addEventListener("keypress", function(action) {
    if((action.keyCode) === 13) {
       listOfTask[getTaskIndex(taskId.textContent)].name = taskNameUpdate.value;
    }
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }
    for(var taskIndex = 0; taskIndex < listOfTask.length; taskIndex++) {
        addTask(listOfTask[taskIndex].name, listOfTask[taskIndex].id);
    }
});

/**
 * To update a subtask name inside a task after filling a value in 
 *     text box by checking the element through it's event
 */
subTaskNameUpdate.addEventListener("keypress", function(action) {
    if((action.keyCode) === 13) {
       var taskIndex = getTaskIndex(taskId.textContent);
       var subTaskIndex = getSubTaskIndex(subTaskIdCommon.textContent, taskIndex)
       listOfTask[taskIndex].subTaskList[subTaskIndex].name = subTaskNameUpdate.value;
       while (subTasks.firstChild) {
           subTasks.removeChild(subTasks.firstChild);
       }
       getTask(taskId.textContent);
    }
});

/**
 * method to add an element in a html after a new task is added
 * @param {the value of the task that which have to be added} taskValue 
 * @param {Unique id for an element to make it's functionality unique} id 
 */
function addTask(taskValue, id) {
    var text = `<div id=${id} class="taskName" onclick=getTask(id)>
                <i class="ms-Icon ms-Icon--BulletedList2 iconSize-24"></i>
                  <p id=${id}>${taskValue}</p>
                </div>`;
    var position = "beforeend";
    tasks.insertAdjacentHTML(position,text);
}

/**
 * method to add an element in a html after a new subtask is added inside a task
 * @param {the value of subtask that which have to be added} subTaskValue 
 * @param {Unique id for an element to make it's fuctionality after clicking it} id 
 */
function listSubTask(subTaskValue, id, status) {
    var subTaskId = document.getElementById("sub-task-id").textContent;
    var taskIndex = getTaskIndex(taskId.textContent);
    var subTaskIndex = getSubTaskIndex(id, taskIndex)
    
    var text = `<div class="subtask-listing"><span><input type="checkbox" id=${id} name="subtask-checkbox" onclick=changeStatus(id) />
                </span>
                  <div id=${id} class="sub-task-list" onclick=getStep(id)>
                  <p id=${id} name="subtask-name">${subTaskValue}</p>
                  <span id="subtask-id">${subTaskId}</span>
                  </div>
                  </div>`;
    var position = "beforeend";
    subTasks.insertAdjacentHTML(position,text);
}

/**
 * Listing a subtask accordingly for a subtask
 * @param {step array to which have to be added inside a subtask} steps 
 */
function listSteps(steps) {
    var element = `<span class="sub-task-list">
                     <input type="checkbox">
                     <p>${steps}</p>
                    </span>`;
    var position = "beforeend";
    step.insertAdjacentHTML(position,element);
}

/**
 * To toggle a steps and load a steps according to it's id related steps
 * @param {id of subtask to get all the steps to that particular subtask} id 
 */
function getStep(id) {
    document.getElementById("step-content").style.display="block";
    document.getElementById("task-content").style.width="40%";
    var taskIndex = getTaskIndex(taskId.textContent);
    var subTaskIndex = getSubTaskIndex(id, taskIndex);
    var task = listOfTask[getTaskIndex(taskId.textContent)];
    for(var subTask = 0; subTask < task.subTaskList.length; subTask++) {
        if(task.subTaskList[subTask].id == id) {
            document.getElementById("sub-task-name").value = "";
            document.getElementById("sub-task-name").value = task.subTaskList[subTask].name;
            document.getElementById("sub-task-name").style.textDecoration = (task.subTaskList[subTask].status) ? "none" : "line-through";
            document.getElementById("subtask-id-steps").checked = (task.subTaskList[subTask].status) ? false : true;
        }
    }
    document.getElementById("sub-task-id").textContent = id;
    while (step.firstChild) {
        step.removeChild(step.firstChild);
    }
    for(var stepsIndex = 0; stepsIndex < listOfTask[taskIndex].subTaskList[subTaskIndex].steps.length; stepsIndex++) {
        listSteps(listOfTask[taskIndex].subTaskList[subTaskIndex].steps[stepsIndex]);
    }
}

/**
 * To load a sub task accordingly for the task
 * @param {id of the task to get it's subtask} id 
 */
function getTask(id) {
    var subTaskName;
    while (subTasks.firstChild) {
        subTasks.removeChild(subTasks.firstChild);
    }
    getIndexForId(id);
    subTaskName = listOfTask[getTaskIndex(id)].name;    
    taskNameUpdate.value = subTaskName;
    task.textContent = "";
    taskId.textContent = id;
}

/**
 * To load a sub task if id of the task is given as param
 * @param {id of the task for which subtask has to be loaded} id 
 */
function getIndexForId(id) {
    for(var listIndex = 0; listIndex < listOfTask.length; listIndex++){
        if(listOfTask[listIndex].id == id) {
            var subTaskArray = listOfTask[listIndex].subTaskList;
            for(var subTask = 0; subTask < subTaskArray.length; subTask++) {
                listSubTask(subTaskArray[subTask].name, subTaskArray[subTask].id, subTaskArray[subTask].status);
                document.getElementsByName("subtask-name")[subTask].style.textDecoration = (subTaskArray[subTask].status) ? "none" : "line-through";
                document.getElementsByName("subtask-checkbox")[subTask].checked = (subTaskArray[subTask].status) ? false : true;
            }
        }
    }
}

/**
 * To get an index of task for that particular id
 * @param {id for which the task index is required from common method} id 
 */
function getTaskIndex(id) {
    for(var listIndex = 0; listIndex < listOfTask.length; listIndex++){
        if(listOfTask[listIndex].id == id) {
            return listIndex;
        }
    }
}

/**
 * To get a sub task index for that id 
 * @param {id for which the sub task index is required from common method} id 
 * @param {task index for which subtask index has to be identified} taskIndex 
 */
function getSubTaskIndex(id, taskIndex) {
    for(var subTaskIndex = 0; subTaskIndex < listOfTask[taskIndex].subTaskList.length; subTaskIndex++){
        if(listOfTask[taskIndex].subTaskList[subTaskIndex].id == id){
            return subTaskIndex;
        }
    }
}

/**
 * To change the status for that id given as param
 * @param {To change the status of that id} id 
 */
function changeStatus(id) { 
    var taskIndex = getTaskIndex(taskId.textContent);
    var subTaskIndex = getSubTaskIndex(id, taskIndex);
    var subTaskStatus = listOfTask[taskIndex].subTaskList[subTaskIndex].status;
    listOfTask[taskIndex].subTaskList[subTaskIndex].status = (subTaskStatus) ? false : true;
    document.getElementsByName("subtask-name")[subTaskIndex].style.textDecoration = (subTaskStatus) ? "line-through" : "none";
    getStep(id);
}

/**
 * To change the status for the element which is available in step 
 */
function changeSubtaskStatus() { 
    var id = subTaskIdCommon.textContent;
    var taskIndex = getTaskIndex(taskId.textContent);
    var subTaskIndex = getSubTaskIndex(id, taskIndex);
    var subTaskStatus = listOfTask[taskIndex].subTaskList[subTaskIndex].status;
    listOfTask[taskIndex].subTaskList[subTaskIndex].status = (subTaskStatus) ? false : true;
    document.getElementsByName("subtask-name")[subTaskIndex].style.textDecoration = (subTaskStatus) ? "line-through" : "none";
    getStep(id);
}

