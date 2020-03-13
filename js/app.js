// vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add tasks
  form.addEventListener("submit", addTasks);

  //   Delete tasks
  taskList.addEventListener("click", removeTask);

  //  Delete everything
  clearBtn.addEventListener("click", clearTasks);

  //   filter
  filter.addEventListener("input", filterTasks);
}

function filterTasks(e) {
  const tasksCollection = document.querySelectorAll(".collection-item");
  tasksCollection.forEach(el => {
    if (
      el.firstChild.textContent
        .toLocaleLowerCase()
        .indexOf(filter.value.toLocaleLowerCase()) !== -1
    ) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
}

function addTasks(e) {
  e.preventDefault();
  if (taskInput.value != "") {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-item";
    removeBtn.textContent = "X";
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.classList.add("success");
    setTimeout(function() {
      taskInput.classList.remove("success");
    }, 3000);
  }

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskInput.value);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
}

function removeTask(e) {
  if (e.target.classList.contains("delete-item")) {
    e.target.parentElement.remove();
  }

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (e.target.parentElement.firstChild.textContent.indexOf(task) !== -1) {
      tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
}

function clearTasks() {
  taskList.innerHTML = "";

  localStorage.removeItem("tasks");
}
function getTasks() {
  var tasks;
  if (localStorage.getItem(tasks) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-item";
    removeBtn.textContent = "X";
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
}
