import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://notes-6ac8b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const noteListInDB = ref(database, "noteList")

let inputEl = document.getElementById("inputArea");
let addBtn = document.getElementById("btn");
let notelistEl=document.getElementById("notelist")

addBtn.addEventListener("click", function () {
    let inputNote = inputEl.value;

    push(noteListInDB, inputNote);

    clearInputEl();
});

onValue(noteListInDB,function (snapshot){
    if(snapshot.exists()){
        let notesArray=Object.entries(snapshot.val())

        clearnoteListEl()
        for (let i = 0; i < notesArray.length; i++) {
            let currentItem = notesArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemTonoteListEl(currentItem)
        }    
    }
    }
)

function appendItemTonoteListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("div")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `noteList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    notelistEl.append(newEl)
}

function clearInputEl() {
    inputEl.value = "";
}

function clearnoteListEl() {
    notelistEl.innerHTML=""
}



