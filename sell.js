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

function uploadImage() {

    const ref = firebase.storage().ref();
    const file = document.querySelector("#image-upload").files[0];
    const pro_name=document.getElementById("pro_name").value;
    const msg_user=document.getElementById("description").value;
    const pro_price=document.getElementById("price").value;
    const name = +new Date() + "-" + file.name;

    const metadata = {contentType: file.type};
    let user_email=JSON.parse(localStorage.getItem("useremail"));
    if (msg_user.length<=10 || pro_name.length>=7){
        alert("description>10 name<7");
    }
    else{
        console.log(user_email);
    const task = ref.child('img/'+'['+user_email+']'+'<'+pro_price+'>'+ name+'{'+msg_user+'}'+'|'+pro_name+'|').put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            alert('Product Listed Successfully');
           
        })
        .catch(console.error);
        
    }

    
}


function auctionupload() {

    const ref = firebase.storage().ref();
    const file = document.querySelector("#image-upload").files[0];
    const pro_name=document.getElementById("pro_name").value;
    const msg_user=document.getElementById("description").value;
    const pro_price=document.getElementById("price").value;
    const name = +new Date() + "-" + file.name;
    const metadata = {contentType: file.type};
    let user_email=JSON.parse(localStorage.getItem("useremail"));
    if (msg_user.length<=10 || pro_name.length>=7){
        alert("description>10 name<7");
    }
    else{
        console.log(user_email);
        const task = ref.child('auctionimg/'+'['+user_email+']'+'<'+pro_price+'>'+ name+'{'+msg_user+'}'+'|'+pro_name+'|').put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url);
                alert('Product Listed for Auction');
               
            })
            .catch(console.error);
        
    }

   
}









const errorMsgElement = document.querySelector('span#errorMsg');








function previewImage() {
    var fileInput = document.getElementById("image-upload");
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            var imagePreview = document.getElementById("image-preview");
            imagePreview.src = event.target.result;
        };
    }
}