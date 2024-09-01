import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyBAUhQnvst1RvP-JQfcoeR80ui4VstKK6Y",
  authDomain: "testing-88bc3.firebaseapp.com",
  databaseURL: "https://testing-88bc3-default-rtdb.firebaseio.com",
  projectId: "testing-88bc3",
  storageBucket: "testing-88bc3.appspot.com",
  messagingSenderId: "633592353172",
  appId: "1:633592353172:web:5fa3678eacc9125a90bf81",
  measurementId: "G-DX55Q8CSS2"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//extratowrite 
import {getDatabase,ref,child,get,set,update,remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
const db=getDatabase();
//
let FnameInp=JSON.parse(localStorage.getItem("username"));
let Fnamemsg=document.getElementById("Fnamemsg");





function AddData(){
    let username=FnameInp;
    let user_no=0;
    var students=[];
   const dbRef=ref(db);
   get(child(dbRef,'EmployeeSet'))
   .then((snapshot)=>{
    snapshot.forEach(childsnapshot=>{
    students.push(childsnapshot.val());
    
   });
   console.log(students);
   for(var i=0;i<students.length;i++)
   {
    if(students[i]["msgfrom"]==username)
    {
        username=(FnameInp)+"{"+String(user_no)+"}";
        console.log(username);
        user_no++;
    }
    }
    finaladd(username);});



   function finaladd(username){
     set(ref(db,'EmployeeSet/'+username),{
        msgfrom:username,msg:Fnamemsg.value}
    ).then(()=>{
        console.log("data added succesfully");
    }).catch((error)=>{
        alert("unsuccesfull");
        console.log("error");
    })}

    alert("msg added!")
    location.reload();
    }





function RetData()
{
    const dbRef=ref(db);
   get(child(dbRef,'EmployeeSet'))
   .then((snapshot)=>{
    var students=[];
    snapshot.forEach(childsnapshot=>{
    students.push(childsnapshot.val());
    
   });
   let alldata="";
   for(let i=0;i<students.length;i++){

    for(let x in students[i]){
        if(x=="msg"){ var msg=students[i][x];}
        else{var from=((students[i][x]).replace(/[{}]/g, '')).replace(/\d+/g, '');}
        
  
    }alldata+='<div class="container"><div class="upper-text">'+from+'</div><div class="message-container"><div class="character-picture"></div><div class="message">'+msg+'</div></div></div><br><br><br>';
    
   }document.getElementById("display").innerHTML=alldata;

});
}


//button define
AddBtn.addEventListener('click',AddData);
//call of msg from databaes
RetData()


