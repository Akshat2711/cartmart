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


var generatedotp;
var username=document.getElementById("name").value;
var userpass=document.getElementById("pass").value;
var useremail=document.getElementById("email").value;
var userotp=document.getElementById("otp").value;



function otp()
{   
  var useremail=document.getElementById("email").value;
    generatedotp = Math.floor(1000 + Math.random() * 9000);
    Email.send({
      SecureToken:"e0fe881c-fbbf-489a-b81c-9301e1ca7e43",
      To: useremail,
      From: 'akshatsrivastava206@gmail.com',
      Subject: 'OTP FOR SIGN UP',
      Body: 'Hello there! your OTP is '+generatedotp,
  }).then(
      message => alert("check your email for otp!")
  );
}


function submitform()
{
var username=document.getElementById("name").value;
var userpass=document.getElementById("pass").value;
var useremail=document.getElementById("email").value;
var userotp=document.getElementById("otp").value;

if(userotp==generatedotp){
alert("correct OTP");

var emailpath=useremail.replace(/[.#$\[\]]/g, '');;//to replace . present in email as not allowed in database


const dbRef=ref(db);
  set(ref(db,'usersinf/'+emailpath),{
    user:username,email:useremail,pass:userpass}
).then(()=>{
    console.log("database updated succesfully!");
    window.location.href="index.html";
}).catch((error)=>{
    alert("unsuccesfull");
    console.log("error unable to add data to database!");
})}









else{
alert("incorrect OTP");

}
}






otpgen.addEventListener("click",otp);
submit.addEventListener("click",submitform);
