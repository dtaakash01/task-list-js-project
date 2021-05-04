// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load Event Listener
loadEventListener();


//Load all Event Listeners
function loadEventListener() {

    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task events
    form.addEventListener('submit', addTask);

    //Remove task
    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearTasks);

    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li Element
    const li = document.createElement('li');

    
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    //Delete li Element
    const div = document.createElement('div');
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = "<i class='fa fa-minus-circle'></i>";

    div.appendChild(link)

    
    li.appendChild(div);

    taskList.appendChild(li);

    //Storage in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}


function getTasks () {
    
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
      
        //Create li Element
        const li = document.createElement('li');

        
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        //Delete li Element
        const div = document.createElement('div');
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='fa fa-minus-circle'></i>";

        div.appendChild(link)

        
        li.appendChild(div);

        taskList.appendChild(li);
    })
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask (e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.parentElement.remove();

        removeFromLocalStorage(e.target.parentElement.parentElement.parentElement);
    }
}

function removeFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks()  {

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {

    localStorage.clear();
}

function filterTasks (e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );


}