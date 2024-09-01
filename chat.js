// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, ref, child, get, set, serverTimestamp, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

var buyerEmail = localStorage.getItem("useremail");
buyerEmail = buyerEmail.replace(/"/g, '');
var userPath = buyerEmail.replace(/[.#$\[\]]/g, '');
var receiverPath = (localStorage.getItem("chatfrom")).replace(/"/g, '');

// Add Data Function
function AddData() {
    let chatMsg = document.getElementById("Fnamemsg").value;
    let username = 'chat';
    let userNo = 0;
    var students = [];
    const dbRef = ref(db);
    get(child(dbRef, 'userchat/'))
        .then((snapshot) => {
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            console.log(students);
            for (var i = 0; i < students.length; i++) {
                for (var j = 0; j < students.length; j++) {
                    if (students[j]["chatno"] === username) {
                        username = 'chat' + "{" + String(userNo) + "}";
                        console.log(username);
                        userNo++;
                    }
                }
            }
            finalAdd(username, chatMsg);
        });
}

// Final Add Function
function finalAdd(username, chatMsg) {
    set(ref(db, 'userchat/' + username), {
        msgfrom: userPath,
        msg: chatMsg,
        msgto: receiverPath,
        chatno: username,
        timestamp: serverTimestamp()
    })
        .then(() => {
            console.log("Data added successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.log("Error: ", error);
        });

    // Scroll to bottom after adding data
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 100); // Timeout to allow for content update before scrolling
    location.reload();
}

// Retrieve Data Function
function retrieveData() {
    const dbRef = ref(db, 'userchat');
    const messagesQuery = query(dbRef, orderByChild('timestamp'));

    get(messagesQuery).then((snapshot) => {
        let students = [];
        snapshot.forEach((childSnapshot) => {
            students.push(childSnapshot.val());
        });

        let allData = "";
        console.log(students);
        students.forEach(student => {
            if (student.msgto === userPath && student.msgfrom === receiverPath) {
                allData += `<div class="container"><div class="upper-text">${student.msgfrom}</div><div class="message-container"><div class="character-picture"></div><div class="message">${student.msg}</div></div></div><br><br><br>`;
            } else if (student.msgto === receiverPath && student.msgfrom === userPath) {
                allData += `<div class="container"><div class="upper-text">${student.msgfrom}</div><div class="message-container"><div class="character-picture"></div><div class="message" id="sender">${student.msg}</div></div></div><br><br><br>`;
            }
        });

        const displayMenu = document.getElementById("display");
        displayMenu.innerHTML = allData;

        // Scroll to bottom after setting the innerHTML
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100); // Timeout to allow for content rendering before scrolling
    }).catch(error => {
        console.error("Error fetching data:", error);
    });
}

retrieveData();

document.getElementById('AddBtn').addEventListener('click', AddData);
