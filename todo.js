const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener('click', deleteToDo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDosObj = {
        text : text,
        id : newId
    }
    toDos.push(toDosObj);
    saveToDos();    
}
    
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentElement;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(a){
        return a.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parseToDos = JSON.parse(loadedToDos);
        parseToDos.forEach(function(element){
            paintToDo(element.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();