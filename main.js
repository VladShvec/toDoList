const addMessage = document.getElementById('description');
const addTaskBtn = document.getElementById('addTask');
let taskBlock = document.getElementById('taskblock');
let block = document.getElementById('listblock');
//let deleteBtn = document.getElementById('deleteBtn');


let toDoList = [];

if(localStorage.getItem('OurDats')){
    toDoList = JSON.parse(localStorage.getItem('OurDats'));
    displayMessages();
}

addTaskBtn.addEventListener('click', function(){
    let toDo = {
        message: addMessage.value,
        cheacked: false,
        important: false,
        
        toString: function() {
    return  this.message;
  }
    };
    
    toDoList.push(toDo);
    displayMessages();
    localStorage.setItem('OurDats', JSON.stringify(toDoList));
});

function displayMessages(){
    let displayMessage = '';
    toDoList.forEach(function(item, i){
    displayMessage += `
    <li>
    
      <label for='item_${i}'><p class='label_p'>${item.message}</p></label>
      <input type='checkbox' class="checkbox" id='item_${i}'>    
    </li>
    `;
//    console.log('displayMessage: ', displayMessage);
        block.innerHTML = displayMessage;
    });
};
       
//deleteBtn.addEventListener('click', function(){
//     toDoList.forEach(function(item, i){
//    toDoList.splice(i, 1)
//     }
//})
