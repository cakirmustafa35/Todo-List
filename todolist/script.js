

// Todo Eleman Ekleme


// Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
// daha profesyonel bir yöntemle ekleme kısmı 
//diziden todo elemanlarını aktarma

//const items = ["Todo 1","Todo 2","Todo 3","Todo 4"];


//local Storageden itemsleri çekme


let todos;


// load items 
loadItems();

eventListeners();


function eventListeners() {
    //submit event 
    form.addEventListener("submit", addNewItem);
    //Delete an item
    taskList.addEventListener("click", deleteItem);
    // delete all item
    btnDeleteAll.addEventListener("click", deleteAllItem);
}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    })


}



// get items from local storage 

function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //Diziyi stringe çevirmek istiyorsak JSON.parse kuıllanılır 
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


// set item to local storage 

function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));


}




function createItem(newTodo) {
    //li oluşturma 

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a oluşturma 

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
}

function addNewItem(e) {
    if (input.value === '') {
        alert("Add new item");
        //console.log("submit");
    }

    // create Item
    createItem(input.value);

    setItemToLS(input.value);







    input.value = "";

    e.preventDefault();
}

// eleman silme 
function deleteItem(e) {

    if (e.target.className == "fas fa-times") {
        if (confirm("silmek istediğinize emin misiniz?")) {
            // console.log(e.target);
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault

}

function deleteTodoFromStorage(deletetodo){
    let todos = getItemsFromLS();

    //eleman local storagede var mı diye kontrol et,tara
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));


}



//tüm elemanları Silmek 
function deleteAllItem(e) {
    if (confirm("Tüm elemanları silmek istedğinize emin misiniz?")) {
        // taskList.childNodes.forEach(function (item) {
        //     //console.log(item);
        //     if (item.nodeType == 1) {
        //         item.remove();
        //     }
        // })
        
        // daha iyi bir yönte
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();

    }

    //alternatif bir yöntem 

    //taskList.innerHTML="";

}

