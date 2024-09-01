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
  import {getDatabase,ref,child,get,set,update,remove,query,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
  const db=getDatabase();


var comment=localStorage.getItem("comment");
var selleremail=localStorage.getItem("email");
var buyeremail=localStorage.getItem("useremail");
var price=localStorage.getItem("price");
var n=localStorage.getItem("proname");
price="Price: ₹"+price.replace(/"/g, '');
var imgurl=localStorage.getItem("urlimg");
imgurl=imgurl.replace(/"/g, '');
n=n.replace(/"/g, '');

document.getElementById("pro_desc").innerHTML=comment;
document.getElementById("price_pro").innerHTML=price;
document.getElementById("pro_name").innerHTML=n;
document.getElementById("image").src=imgurl;

selleremail=selleremail.replace(/"/g, '');
var buyer=buyeremail.replace(/"/g, '');

//path of user and seller
var userpath=buyer.replace(/"/g, '');
userpath=userpath.replace(/[.#$\[\]]/g, '');//to replace . present in email as not allowed in database
var sellerpath=selleremail.replace(/"/g, '');
sellerpath=sellerpath.replace(/[.#$\[\]]/g, '');//to replace . present in email as not allowed in database



function addtochat(){
    let chatmsg=userpath+" interested in buying "+n;
    let username='chat';
    let user_no=0;
    var students=[];
   const dbRef=ref(db);
   get(child(dbRef,'userchat/'))
   .then((snapshot)=>{
    snapshot.forEach(childsnapshot=>{
    students.push(childsnapshot.val());
    
   });
   console.log(students);
   for(var i=0;i<students.length;i++)
   {for(var j=0;j<students.length;j++){
    if(students[j]["chatno"]==username)
    {
        username='chat'+"{"+String(user_no)+"}";
        user_no++;
    }
    }}
    finaladd(username,chatmsg);});
}


   function finaladd(username,chatmsg){
     set(ref(db,'userchat/'+username),{
        msgfrom:userpath,msg:chatmsg,msgto:sellerpath,chatno:username,timestamp:serverTimestamp()}
    ).then(()=>{
        console.log("data added succesfully");
    }).catch((error)=>{
        alert("unsuccesfull");
        console.log("error");
    })

    
    window.location.href="chatmenu.html"
}

addchatbtn.addEventListener('click',addtochat);

