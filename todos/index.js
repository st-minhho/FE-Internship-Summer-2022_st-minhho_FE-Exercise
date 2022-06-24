var todo = [];

var $todoList = document.querySelector(".js-todo-list");
var $btnAdd = document.querySelector(".js-btn-add");

function getLocal(key) {
  var item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
}
function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

$btnAdd.addEventListener("click", addToDo);

  renderData();

function renderData() {
  var todoList = getLocal("todo");
  var html = "";
  if (todoList) {
    todoList.forEach(function (data) {
      html +=
        '<li class="todo-item" data-id="' + data.id +'">' +
        '<input class="todo-content" value = "'+data.content+'"/>' +
        '<button class = "btn btn-remove" data-id="' + data.id + '"><i class="fa fa-remove"></i></button>' +
        '<button class = "btn btn-edit" data-id="' + data.id + '"><i class="fa fa-edit"></i></button>' +
        "</li>";
    });
    $todoList.innerHTML = html;
  }

  let $btnRemove = document.querySelectorAll(".btn-remove");
  for (let i = 0; i < $btnRemove.length; i++) {
    $btnRemove[i].addEventListener("click", removeTodo);
  }

  let $btnEdit = document.querySelectorAll(".btn-edit");
  for (let i = 0; i < $btnEdit.length; i++) {
    $btnEdit[i].addEventListener("click", editTodo);
  }
}


function addToDo() {
  var getContent = document.querySelector(".js-content").value;
  todo = getLocal("todo");
  if (todo) {
    todo.push({
      id: Date.now(),
      content: getContent,
      check: false,
    });
  }
  setLocal("todo", todo);
  renderData();
}

function removeTodo(e) {
  var idToDo = e.target.dataset.id
  var getList = getLocal("todo");
  console.log(getList)
  var index = getList.findIndex(function (item) {
    return item.id === +idToDo
  })

  getList.splice(index,1)
  setLocal("todo", getList);
  renderData();
}

function editTodo(e){
  var getList = getLocal("todo");
  var getValue = e.target.parentElement;
  var value = getValue.querySelector('.todo-content').value;
  getList.map(function(item){
    if(item.id === +e.target.dataset.id){
      item.content = value
    }
  })
  setLocal("todo", getList);  
  renderData();
}
