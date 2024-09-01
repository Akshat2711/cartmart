import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {   serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


var highestbid_amount,highestBidder_name;
var buyeremail=localStorage.getItem("useremail");
buyeremail=buyeremail.replace(/"/g, '');
var auctionpath=buyeremail.replace(/[.#$\[\]]/g, '');//to replace . present in email as not allowed in database
var auction_img_path=localStorage.getItem("auctionimgpath");
auction_img_path=auction_img_path.replace(/"/g, '');
var selleremail=localStorage.getItem("auctionemail");
selleremail=selleremail.replace(/"/g, '');
var emailpath=selleremail.replace(/[.#$\[\]]/g, '');//to replace . present in email as not allowed in database

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


var imgurl=localStorage.getItem("auctionurlimg");
imgurl=imgurl.replace(/"/g, '');
document.getElementById("image").src=imgurl;
var img_forpath=(imgurl.replace(/[.#$\[\]]/g, '')).replace(/\//g, '');





if(auctionpath==emailpath){
    document.getElementById("show_end_button").innerHTML='<button class="bid-button" id="endbid">End</button>';
}
function checkbid(){
    var bidprice=document.getElementById("bidamount").value;
    const dbRef = ref(db);
    var students=[];
    var a=get(child(dbRef, 'auctionmsg/' + emailpath +img_forpath+ '/'+auctionpath))
    .then((snapshot)=>{
        snapshot.forEach(childsnapshot=>{
        students.push(childsnapshot.val());
        
       });
       if(parseInt(bidprice)<=parseInt(students[0])){
        alert("enter amount that is more than previous amount");
       }
       else{
        addbid();
       }
       
    
    });
}   

function endbidding(){


///////code for confetti////////////////////
    let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;


Draw();
//////////////////////////////////

/////////////////////////////////////
const dbRef = ref(db);
var students = [];

get(child(dbRef, 'auctionmsg/' + emailpath + img_forpath + '/'))
  .then((snapshot) => {
    snapshot.forEach(childsnapshot => {
      students.push(childsnapshot.val());
    });

    console.log(students); // Log to check data retrieval

     highestbid_amount = 0;
     highestBidder_name = "none";

    // Find the highest bid and the corresponding bidder
    for (let i = 0; i < students.length; i++) {
      if (parseInt(students[i].bidamount) > highestbid_amount) {
        highestbid_amount = parseInt(students[i].bidamount);
        highestBidder_name = students[i].user;
      }
    }

    // Display the result
    document.getElementById("cong_text").innerHTML = `Congratulations<br> ${highestBidder_name}<br> won the auction by paying<br> ₹${highestbid_amount}
    <br><br><button id="communicate" onclick=comm_winner()>Communicate💬</button>`;
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });

///////////////////////////////////////////
window.scrollTo(top);

}


function addbid(){
    var bidprice=document.getElementById("bidamount").value;

     set(ref(db,'auctionmsg/'+emailpath+img_forpath+'/'+auctionpath),{
        bidamount:bidprice,user:auctionpath}
    ).then(()=>{
        console.log("bid added succesfully");
        location.reload();
    }).catch((error)=>{
        alert("unsuccesfull");
        console.log("error");
    })
  
}




window.comm_winner = function() {
    firebase.initializeApp(firebaseConfig);


    function deleteFile(ref) {
        return ref.delete()
          .then(() => {
            console.log('File deleted successfully');
            // Refresh the list of images
            retrieve();
          })
          .catch((error) => {
            console.error('Error deleting file:', error);
            // Throw the error to the outer catch block
            throw error;
          });
      }



      function delete_auc_msg(path) {
        const dbRef = ref(db, "auctionmsg/" + path);
        
        remove(dbRef)
            .then(() => {
                console.log("Data removed successfully!");
            })
            .catch((error) => {
                console.error("Error removing data:", error);
            });
    }





    function addtochat(){
        let chatmsg= `Congratulations ${highestBidder_name} won the auction by paying<br> ₹${highestbid_amount} organized by ${emailpath}`;
    
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
         if(highestBidder_name!="none")
            {finaladd(username,chatmsg);
            }
        });
    }
    
    
       function finaladd(username,chatmsg){
         set(ref(db,'userchat/'+username),{
            msgfrom:emailpath,msg:chatmsg,msgto:highestBidder_name,chatno:username,timestamp:serverTimestamp()}
        ).then(()=>{
            console.log("data added succesfully");
        }).catch((error)=>{
            alert("unsuccesfull");
            console.log("error");
        })
    }
    














    let text = "Pressing OK will lead to deletion of this auction";
    if (confirm(text) == true) {
        const storageRefAuctionImg = firebase.storage().ref('auctionimg/'+auction_img_path+'/');
        addtochat();

        deleteFile(storageRefAuctionImg);
        delete_auc_msg(emailpath +img_forpath+ '/');
        window.location.href="chatmenu.html";

    } else {
        alert("communication failed!");
    }
};

function RetbidData()
{   var highestamount = 0;
    const dbRef = ref(db);
    
    get(child(dbRef, 'auctionmsg/' + emailpath +img_forpath+ '/'))
        .then((snapshot) => {
            var students = [];
            snapshot.forEach(childsnapshot => {
                students.push(childsnapshot.val());
            });
    
            let alldata = "";
            let highestBidder = ""; // To store the user with the highest bid
            for (let i = 0; i < students.length; i++) {
                for (let x in students[i]) {
                    if (x === "bidamount") {
                        var bidamount = parseInt(students[i][x]);
                        if (bidamount >= highestamount) {
                            highestamount = bidamount;
                            highestBidder = students[i].user; // Assuming there's a user field in the data
                        }
                    }
                }
                if(students[i].user==auctionpath){
                    alldata += '<li class="bid-item" style="background-color:#034109;color:black;"><div class="bid-amount" >₹' + students[i].bidamount + '</div><div class="bidder-name">' + students[i].user + '</div></li>';
                }
                else{
                    alldata += '<li class="bid-item" style="background-color:black;color:white;"><div class="bid-amount">₹' + students[i].bidamount + '</div><div class="bidder-name">' + students[i].user + '</div></li>';
                }
                
            }
    
            document.getElementById("bidlist").innerHTML = alldata;
            document.getElementById("highestbid").innerHTML = "Highest Bid: ₹" + highestamount + " by " + highestBidder;
    
        });
    
}



RetbidData()






//button define
bidbtn.addEventListener('click',checkbid);
endbid.addEventListener('click',endbidding);
