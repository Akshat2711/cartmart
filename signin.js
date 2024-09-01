import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyBZBS-CAB9D0ryL7S1l0Gjyy92_bUrlRQc",
    authDomain: "image-upload-1ce9c.firebaseapp.com",
    databaseURL: "https://image-upload-1ce9c-default-rtdb.firebaseio.com",
    projectId: "image-upload-1ce9c",
    storageBucket: "image-upload-1ce9c.appspot.com",
    messagingSenderId: "174674177688",
    appId: "1:174674177688:web:927529cb8f1f3a3e002aed",
    measurementId: "G-6V5D2Y0KZJ"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//extratowrite 
import {getDatabase,ref,child,get,set,update,remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
const db=getDatabase();
///////////////////////////////DATABASE ABOVE CONNECTION OBJ//////////////////////////////////////////////////////////////////////////////////////////////////////////






function signinaccount(){
    var useremail=document.getElementById("email").value;
    var userpass=document.getElementById("pass").value;
  
    let usercheck=[];
     const dbRef=ref(db);
     get(child(dbRef,'usersinf'))
     .then((snapshot)=>{
      snapshot.forEach(childsnapshot=>{
      usercheck.push(childsnapshot.val());
      

     });
    

     for(var i=0;i<usercheck.length;i++){
        if(usercheck[i]['email']==useremail && usercheck[i]['pass']==userpass){
            var localuserstorage=usercheck[i]["email"];
            localStorage.setItem("useremail",JSON.stringify(localuserstorage));
            
            window.location.href = "main.html";

        }

      
    }
    

    
    
    })
}
signin.addEventListener("click",signinaccount);