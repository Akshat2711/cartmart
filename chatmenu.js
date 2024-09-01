// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZBS-CAB9D0ryL7S1l0Gjyy92_bUrlRQc",
    authDomain: "image-upload-1ce9c.firebaseapp.com",
    databaseURL: "https://image-upload-1ce9c-default-rtdb.firebaseio.com",
    projectId: "image-upload-1ce9c",
    storageBucket: "image-upload-1ce9c.appspot.com",
    messagingSenderId: "174674177688",
    appId: "1:174674177688:web:927529cb8f1f3a3e002aed",
    measurementId: "G-6V5D2Y0KZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Retrieve user email and format it for use as a Firebase key
var buyerEmail = localStorage.getItem("useremail");
buyerEmail = buyerEmail.replace(/"/g, '');
var userPath = buyerEmail.replace(/[.#$\[\]]/g, '');

// Function to retrieve data
function retrieveData() {
    const dbRef = ref(db);
    get(child(dbRef, 'userchat'))
        .then((snapshot) => {
            let students = [];
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            students.sort((a, b) => b.timestamp - a.timestamp);

            let allData = "";
            let allSender = [];
            console.log(students);
            students.forEach(student => {
                var msgsendername=student.msgfrom;
                if(msgsendername===userPath){msgsendername=student.msgto;}
                if(student.msgfrom===userPath || student.msgto===userPath){
                if (!allSender.includes(student.msgfrom+student.msgto) && !allSender.includes(student.msgto+student.msgfrom)) {
                    allSender.push(student.msgfrom+student.msgto);
                    allSender.push(student.msgto+student.msgfrom);
                    allData += `<button class="button" id="chatbtn" value='${msgsendername}'>
                    <li class="chat-item">
                <a href="#chat2" class="chat-link">
                    <img class="chat-img" src="https://www.ancodeai.com/placeholder.svg" alt="Profile picture of Jane Smith">
                    <div class="chat-info">
                        <p class="chat-name">${msgsendername}</p>
                        <p class="chat-message">${student.msg}</p>
                    </div>
                </a>
            </li></button><br>`;
                }}
            });

            const displayMenu = document.getElementById("displaymenu");
            if(allData ===""){displayMenu.innerHTML="__OOPS! you dont have any chat,intiliaze a chat from buy page__"}
            else{displayMenu.innerHTML = allData;}
            console.log(allSender);
            Array.from(displayMenu.getElementsByClassName("button")).forEach(button => {
                button.addEventListener('click', chatting);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Function to handle chatting event
function chatting(event) {
    const button = event.target.closest('.button');
    let chatFrom = button.value;
    localStorage.setItem("chatfrom", JSON.stringify(chatFrom));
    window.location.href = "chat.html";
}

// Initial data retrieval
console.log(userPath);
retrieveData();
