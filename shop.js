const firebaseConfig = {
    apiKey: "AIzaSyBZBS-CAB9D0ryL7S1l0Gjyy92_bUrlRQc",
    authDomain: "image-upload-1ce9c.firebaseapp.com",
    projectId: "image-upload-1ce9c",
    storageBucket: "image-upload-1ce9c.appspot.com",
    messagingSenderId: "174674177688",
    appId: "1:174674177688:web:927529cb8f1f3a3e002aed",
    measurementId: "G-6V5D2Y0KZJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function retrieve()
{

    const storageRef = firebase.storage().ref('img/');
    storageRef.listAll()
        .then((result) => {
            const promises = result.items.map(async (item) => {
                const imagesRef = firebase.storage().ref().child('img/');
                const imageRef = imagesRef.child(item.name);
                const url = await imageRef.getDownloadURL();
                const fileName = item.name; // Extract the file name
    
                console.log(`File Name: ${fileName}, URL: ${url}`);
                
                return { fileName, url };
            });
    
            return Promise.all(promises);
        })
        .then((fileInfoArray) => {
            let img_all = "";
            fileInfoArray.forEach(({ fileName, url }) => {
                const startIndex = fileName.indexOf("<");
                const endIndex = fileName.indexOf(">");

                // Extract the text between angle brackets
                const price= fileName.substring(startIndex + 1, endIndex);

                let s=fileName.indexOf('{');
                let e=fileName.indexOf('}');
                let desc=fileName.substring(s+1,e);
                let s1=fileName.indexOf('|');
                let e1=fileName.indexOf('|',s1+1);
                let n=fileName.substring(s1+1,e1);
                
                img_all += `
                   
                    

                    <div class="wrapper">
  <div class="container">
    <div class="top"><img class="image" src=${url}></div>
    <div class="bottom">
      <div class="left">
        <div class="details">
          <h1>${n}</h1>
          <p>₹${price}</p>
        </div>
        <button  value="${url}+${fileName}" onclick="buybutton()" class="buy_btn">
        🛒
        </button>
      </div>
      
    </div>
  </div>
  <div class="inside">
    <div class="icon"><i class="material-icons">info_outline</i></div>
    <div class="contents">
    <center>
      <p>
            ${desc}
      </p>
    </center>
    </div>
  </div>
</div>
                    `;
            });
            img_all = `<div class="parent">${img_all}</div>`;
            console.log(img_all)
            document.getElementById("allimages").innerHTML = img_all;
        })
        .catch((error) => {
            console.error('Error retrieving download URLs:', error);
        });
    
    
} 


function buybutton() {
    let a = event.target.value;
    /////////to get pic url////////////
    let b=a.indexOf('[');
    let buyurl=a.substring(0,b);
    ///////////////////////////////////

    //////////to get user email/////////
    let c=a.indexOf(']');
    let email=a.substring(b+1,c);
    ////////////////////////////////////

    //////////to get pro price/////////
    let d=a.indexOf('<');
    let e=a.indexOf('>');
    let price=a.substring(d+1,e);
    ////////////////////////////////////

     //////////to get user comment/////////
     let f=a.indexOf('{');
     let g=a.indexOf('}');
     let comment=a.substring(f+1,g);
     ////////////////////////////////////

      //////////to get product name/////////
      let h=a.indexOf('|');
      let i=a.indexOf('|',h+1);
      let n=a.substring(h+1,i);

    
    
    console.log(email+price+comment);
    localStorage.setItem("email",JSON.stringify(email));
    localStorage.setItem("price",JSON.stringify(price));
    localStorage.setItem("comment",JSON.stringify(comment));
    localStorage.setItem("urlimg",JSON.stringify(buyurl));
    localStorage.setItem("proname",JSON.stringify(n));
  
    window.location.href="buypage.html";
}
retrieve();