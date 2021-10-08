//const addMessage = document.getElementById('description');
//const addTaskBtn = document.getElementById('addTask');
//let taskBlock = document.getElementById('taskblock');
//let block = document.getElementById('listblock');
////let deleteBtn = document.getElementById('deleteBtn');
//let checkbox = document.getElementsByClassName('checkbox');
//
//let toDoList = [];
//
//if(localStorage.getItem('OurDats')){
//    toDoList = JSON.parse(localStorage.getItem('OurDats'));
//    displayMessages();
//}
//
//addTaskBtn.addEventListener('click', function(){
//    let toDo = {
//        message: addMessage.value,
//        cheacked: false,
//        important: false,
//        
//        toString: function() {
//            return  this.message;
//          }
//    };
//    
//    toDoList.push(toDo);
//    displayMessages();
//    localStorage.setItem('OurDats', JSON.stringify(toDoList));
//});
//
//function displayMessages(){
//    let displayMessage = '';
//    toDoList.forEach(function(item, i){
//    displayMessage += `
//    <li>
//      <label for='item_${i}'><p class='label_p'>${item.message}</p></label>
//      <input type='checkbox' class="checkbox" ;id='item_${i}'>    
//    </li>
//    `;
////    console.log('displayMessage: ', displayMessage);
//    });
//
//        block.innerHTML = displayMessage;
//};
//checkbox.addEventListener('change' , function(event){
//    console.log(event.target)
//})
//       
////deleteBtn.addEventListener('click', function(){
////     toDoList.forEach(function(item, i){
////    toDoList.splice(i, 1)
////     }
////})

let todolist = [];
    

function render() {
    let content = App()
    
    const root = document.getElementById('root')
    root.innerHTML = '';    
    root.appendChild(content);
}

const Todo = (todo) => {
    
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(todo.message));
    li.setAttribute('id', todo.id);
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id' , 'inputId');
    if (todo.checked){
            input.setAttribute('checked', 'checked');
    
    };
    li.appendChild(input);
    input.addEventListener('change' , function(event){
   
        let markedCheckbox = event.target.checked;
        let checkedItem = event.target.parentElement.getAttribute('id');
        todolist = todolist.map((todo, key) => {
            if (todo.id == checkedItem){
                todo.checked = markedCheckbox;   
            }  
            
            return todo
        });
        
        render();
    });
    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Удалить'));
    li.appendChild(button);
    button.addEventListener('click',function(event){
        let getId = event.target.parentElement.getAttribute('id');
        todolist = todolist.filter(function(todoItem){
            return todoItem.id != getId;
        })
        
        render();
    })
    return li;
}

const TodoList = () => {
     let list = document.createElement('ul');
     list.setAttribute('id' ,'listblock' )
     todolist.map(function(todo, key){
         console.log(todo)
         
         let li = Todo(todo);
         list.appendChild(li)
     })
    return list;
}

const Form = () => {
    let input = document.createElement('input');
    let button = document.createElement('button');
    let div = document.createElement ('div');
    div.appendChild(input);
    div.appendChild(button);
    button.appendChild(document.createTextNode('Отправить'));
    button.setAttribute('class' , 'sendButton');
    input.setAttribute('placeholder', 'Напишите ваш текст');
    button.addEventListener('click',function(event){
        if (!input.value){
            return;
        };
        let date = new Date()
        let toDo = {
            message: input.value,
            checked: false,
            id: date.getTime()
        };
        
        todolist.push(toDo);
        
        render();
    })
    
    return div;
}

const App = () => {
    const form = Form();
    const toDoList = TodoList();
    let mainBlock = document.createElement('div');
    mainBlock.setAttribute('class' ,'_container' );
    mainBlock.appendChild(form);
    mainBlock.appendChild(toDoList);
    return mainBlock;
    
}
render();