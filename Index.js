var allInputData = []; // declared array for storing inputs

let clearAllButton = document.getElementById("clearAllBtn"); // getting Clear All Button

listener();

clearAllButton.addEventListener("click", function(){ // event Listner for clear all button
    if(allInputData[0] !== undefined){
        undoDept(this); // undo department
    }else{
        alert("It's already CLEARRR !"); // if array is empty
    }
})


//FUNCTIONS
function addData(){
    var singleInputData = document.getElementById("inputData").value.trim(); // get value from input
    if(singleInputData !==''){
        allInputData.push(singleInputData); // push in array
        document.getElementById("inputData").value=''; // reset value of input
        displayData();
    }
}


function displayData(){
    var list = document.getElementById("dataDisplay"); // get list
    var listItem = document.createElement("li"); // create new list item
    // listItem.textContent = allInputData[allInputData.length-1]; // add content (removed for adding ID and buttons)
    addListItem(list,listItem); 
}


function addListItem(list,listItem){
    //add data to li, add edit button & add Cross Button with id to it.
    listItem.innerHTML=(allInputData[allInputData.length-1]+"<button id = 'crossBtn"+allInputData.length+"'>X</button><button id = 'editBtn"+allInputData.length+"'>edit</button>");
    listItem.id = allInputData.length; //add id
    listItem.className = "do"; // add class

    // add Click Listener to list items
    listItem.addEventListener("click", function(){
        this.classList.toggle("done"); // toggle class added for line through
    });
    
    // add new element to list
    list.appendChild(listItem);

    // Event Listener on Cross Button
    document.getElementById("crossBtn"+allInputData.length).addEventListener("click", function(event){
        deleteListItem(this);
        event.stopPropagation(); // event will not work for parent's click
    });

    // Event Listener on edit button
    document.getElementById("editBtn"+allInputData.length).addEventListener("click", function(event){
        editListItem(this);
        event.stopPropagation();
    });

}


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


function listenerLineThrough(){
    // add event Listeners again to undo data
    let deletedSoIncrease = 1;

    for(let i=0; i< document.getElementsByClassName("do").length; i++){
        document.getElementsByClassName("do")[i].addEventListener("click", function(event){
            this.classList.toggle("done"); // adding toggle class
            // event.stopPropagation();
        });

        // if for handling deleted list items
        if (document.getElementById("crossBtn"+(i+deletedSoIncrease))){
            //edit button
            document.getElementById("editBtn"+(i+deletedSoIncrease)).addEventListener("click", function(event){
                editListItem(this);
                event.stopPropagation();
            });
            //cross button
            document.getElementById("crossBtn"+(i+deletedSoIncrease)).addEventListener("click", function(event){
                deleteListItem(this);
                event.stopPropagation(); // event will not work for parent's click
            });
        }else{
            //for loop till the available list item arrives
            for(let j=i; i< document.getElementsByClassName("do").length; j++){
                if(document.getElementById("crossBtn"+(i+deletedSoIncrease))){
                    break;
                }else{
                    deletedSoIncrease++;
                }
            }
            //edit button
            document.getElementById("editBtn"+(i+deletedSoIncrease)).addEventListener("click", function(event){
                editListItem(this);
                event.stopPropagation();
            });
            //cross button
            document.getElementById("crossBtn"+(i+deletedSoIncrease)).addEventListener("click", function(event){
                deleteListItem(this);
                event.stopPropagation(); // event will not work for parent's click
            });
        }
        
    }   
}


let undoData;// global declaration 

function undoDept(btn){
    if (btn.value === 'Clear All'){
        undoData = document.getElementById("dataDisplay").innerHTML; // save previous data
        document.getElementById("dataDisplay").innerHTML=''; // clear display
        btn.value="Undo"; // change name of button
    }else if(btn.value === 'Undo'){
        document.getElementById("dataDisplay").innerHTML=(undoData); // undo previous data
        listenerLineThrough();
        btn.value="Clear All"; // change name of button
    }
}


function deleteListItem(event){
    allInputData.splice(event.parentElement.id,1); //removes element from array
    document.getElementById(event.parentElement.id).outerHTML = ""; // removes the html of list item
}

function editListItem(event){
    let content = event.parentElement.textContent.slice(0,-5); // get parent's text
    let indexForEdit = allInputData.indexOf(content); // get index for array
    let editedText = prompt("Edit mode: ", content); // get new edited text
    allInputData[indexForEdit] = editedText; //add edited text to array
    //update text
    let textToChange = event.parentElement.childNodes[0];
    textToChange.nodeValue = editedText;
}

