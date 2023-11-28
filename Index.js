var allInputData = []; // Array for storing inputs
clearAllButton = document.getElementById("clearAllBtn"); // Clear all button
let timeOut; 
let crossButton;

listener();

// Event Listner for clear all button    
clearAllButton.addEventListener("click", function(){
    if(allInputData[0] !== undefined){
        undoDept(this); // undo department
    }else{
        alert("It's already CLEARRR !"); // If array is empty
    }
})

// FUNCTIONS

// ADD Button / Press ENTER
function listener(){
    // click on add button, call function addData
    document.getElementById("addButton").addEventListener("click", function(){
        if(clearAllButton.value === 'Undo'){ // clearnig undo dept data
            allInputData = []; //clear array
            undoData = undefined; //clear undoData
            clearAllButton.value = 'Clear All'; // Reset Button value
        }
        addData();
        
    });
    // pressing Enter on keyboard, call function addData
    document.addEventListener("keydown", function(event){
        if(event.key === 'Enter'){
            if(clearAllButton.value === 'Undo'){ // clearnig undo dept data
                allInputData = []; //clear array
                undoData = undefined; //clear undoData
                clearAllButton.value = 'Clear All'; // Reset Button value
            }
            addData();
        }
    });
}

// Adds data to array
function addData(){
    var singleInputData = document.getElementById("inputData").value.trim(); // get value from input
    if(singleInputData !==''){
        allInputData.push(singleInputData); // push in array
        document.getElementById("inputData").value=''; // reset value of input
        displayData();
    }
}

// Creates List Item
function displayData(){
    let list = document.getElementById("dataDisplay"); // get list
    let listItem = document.createElement("li"); // create new list item
    listItem.textContent = allInputData[allInputData.length-1]; // add content (removed for adding ID and buttons) (readded)
    listItem.id = allInputData.length; // Give id to li
    listItem.className = 'do'; // add class name
    list.appendChild(listItem); // append li to list
    addButtons(listItem);
}

// Creates new buttons as child nodes
function addButtons(listItem){  
    let button1 = document.createElement("button"); // create new button
    button1.innerHTML = 'X'; // button name
    button1.className = 'crossButton'; // button class
    let button2 = document.createElement("button"); // create new button
    button2.innerHTML = 'edit'; //button name
    button2.className = 'editButton'; //button class
    listItem.appendChild(button1); // append in list item
    listItem.appendChild(button2); // append in list item
    addListeners(listItem.id);
    
}

// Adds event listeners to list item and childern
function addListeners(li_id){
    let li = document.getElementById(li_id); // get list item
    li.addEventListener("click", function(){ // add event listener - List Item
        this.classList.toggle("done");
    });
    li.childNodes[1].addEventListener("click", function(event){ // add event listener - Cross Button
        crossButton = this; // stores button
        wait3sec(this); 
        event.stopPropagation(); // propagation for bubbling
    })
    li.childNodes[2].addEventListener("click", function(event){ // add event listener - Edit Button
        event.stopPropagation(); // propagation for bubbling
        editListItem(this); 
        
    }) 


}

// Re-adds event listeners
function addListenersAgain(){
    let listItems = document.getElementsByClassName("do"); // get all the list items
    for(let i = 0; i<allInputData.length; i++){ // itterate over all LIs
        listItems[i].id = (i+1); // assign new id
        addListeners(listItems[i].id); // add Listener to that id
    }
}

// Undo Department
function undoDept(btn){
    if (btn.value === 'Clear All'){
        crossButton.innerHTML = 'X'; // change button name
        clearTimeout(timeOut); // Clears wait 3 sec (if any);
        undoData = document.getElementById("dataDisplay").innerHTML; // saves previous data
        document.getElementById("dataDisplay").innerHTML=''; // clears display
        btn.value="Undo"; // changes name of button
    }else if(btn.value === 'Undo'){
        document.getElementById("dataDisplay").innerHTML=(undoData); // undo previous data
        addListenersAgain();
        btn.value="Clear All"; // change name of button
    }
}

// Edit Department
function editListItem(event){
    let content = event.parentElement.textContent.slice(0,-5); // get parent's text
    let indexForEdit = allInputData.indexOf(content); // get index for array
    let editedText = prompt("Edit mode: ", content).trim(); // get new edited text
    if (editedText === ''){ // if there is no text
        deleteListItem(event); // delete item
    }else{
    event.parentElement.classList.remove("done"); // removes line through
    allInputData[indexForEdit] = editedText; //add edited text to array
    //update text accordingly 
    let textToChange = event.parentElement.childNodes[0];
    textToChange.nodeValue = editedText;
    }
}


// Waits 3 seconds before removing
function wait3sec(crsBtn){
    if (crsBtn.innerHTML === 'X'){
        crsBtn.innerHTML = "undo";
        timeOut = setTimeout(deleteListItem, 1000, crsBtn); // time out for 2 sec
    }
    else{
        clearTimeout(timeOut); // clears timeout (Undo)
        crsBtn.innerHTML = 'X';
    }
}

// Removes the list item
function deleteListItem(event){
    allInputData.splice(event.parentElement.id,1); //removes element from array
    document.getElementById(event.parentElement.id).outerHTML = ""; // removes the html of list item
}
