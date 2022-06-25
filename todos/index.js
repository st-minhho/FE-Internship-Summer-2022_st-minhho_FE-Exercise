var todo = [];

var $todoList = document.querySelector('.js-todo-list');
var $input = document.querySelector('.js-content');
var $btnAdd = document.querySelector('.js-btn-add');
var $btnAll = document.querySelector('.js-btn-all');
var $btnActive = document.querySelector('.js-btn-active');
var $btnCompleted = document.querySelector('.js-btn-completed');
var $btnClearCompleted = document.querySelector('.js-btn-clear-completed');

function getLocal(key) {
  var item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
}
function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

$btnAdd.addEventListener('click', addToDo);
$btnAll.addEventListener('click', showdata);
$btnActive.addEventListener('click', activeList);
$btnCompleted.addEventListener('click', completedList);
$btnClearCompleted.addEventListener('click', clearCompletedList);

$input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    addToDo();
  }
});
showdata();

function activeList() {
  var todoList = getLocal('todo');
  var listActive = todoList.filter(function (item) {
    return item.check == false;
  });
  renderData(listActive);
}

function completedList() {
  var todoList = getLocal('todo');
  var listCompleted = todoList.filter(function (item) {
    return item.check != false;
  });
  renderData(listCompleted);
}

function renderData(arrList) {
  var html = '';
  if (arrList) {
    arrList.forEach(function (data) {
      html +=
        '<li class="todo-item" data-id="' +
        data.id +
        '">' +
        '<button class = "btn btn-check" data-id="' +
        data.id +
        '">' +
        '<i class="fa fa-check"></i></button>' +
        '<input class="todo-content" value = "' +
        data.content +
        '"/>' +
        '<button class = "btn btn-edit" data-id="' +
        data.id +
        '"><i class="fa fa-edit"></i></button>' +
        '<button class = "btn btn-remove" data-id="' +
        data.id +
        '"><i class="fa fa-remove"></i></button>' +
        "</li>";
    });

    $todoList.innerHTML = html;
  }

  let $btnRemove = document.querySelectorAll('.btn-remove');
  for (let i = 0; i < $btnRemove.length; i++) {
    $btnRemove[i].addEventListener('click', removeTodo);
  }

  let $btnEdit = document.querySelectorAll('.btn-edit');
  for (let i = 0; i < $btnEdit.length; i++) {
    $btnEdit[i].addEventListener('click', editTodo);
  }

  let $btnCheck = document.querySelectorAll('.btn-check');
  for (let i = 0; i < $btnCheck.length; i++) {
    $btnCheck[i].addEventListener('click', checkTodo);
    if (arrList[i].check) {
      $btnCheck[i].classList.add('class', 'check-icon');
      $btnCheck[i].nextElementSibling.classList.add('class', 'text-check');
    }
  }
}

function showdata() {
  var todoList = getLocal('todo');
  renderData(todoList);
}

function addToDo(e) {
  var getContent = document.querySelector('.js-content').value;
  todo = getLocal('todo');
  if (todo) {
    todo.push({
      id: Date.now(),
      content: getContent,
      check: false,
    });
  }
  setLocal('todo', todo);
  showdata(todo);
}

function removeTodo(e) {
  var idToDo = e.target.dataset.id;
  var getList = getLocal('todo');
  var index = getList.findIndex(function (item) {
    return item.id === +idToDo;
  });
  getList.splice(index, 1);
  setLocal('todo', getList);
  showdata(getList);
}

function editTodo(e) {
  var getList = getLocal('todo');
  var getValue = e.target.parentElement;
  var value = getValue.querySelector('.todo-content').value;
  getList.map(function (item) {
    if (item.id === +e.target.dataset.id) {
      item.content = value;
    }
  });
  setLocal('todo', getList);
  showdata(getList);
}

function checkTodo(e) {
  var getList = getLocal('todo');
  var idToDo = e.target.dataset.id;
  getList.map(function (item) {
    if (item.id === +idToDo) {
      if (item.check) {
        item.check = false;
        e.target.classList.remove('check-icon');
        e.target.nextElementSibling.classList.remove('text-check');
      } else {
        item.check = true;
        e.target.classList.add('class', 'check-icon');
        e.target.nextElementSibling.classList.add('class', 'text-check');
      }
    }
  });
  setLocal('todo', getList);
}

function clearCompletedList() {
  var todoList = getLocal('todo');
  var listClearCompleted = todoList.filter(function (item) {
    return item.check === false;
  });
  setLocal('todo', listClearCompleted);
  renderData(listClearCompleted);
}
