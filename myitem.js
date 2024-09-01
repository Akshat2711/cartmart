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

function retrieve() {
  // Reference to the 'img/' directory
  let storageRef1 = firebase.storage().ref('img/');
  // Reference to the 'auctionimg/' directory
  let storageRef2 = firebase.storage().ref('auctionimg/');
  
  // Function to list all files in a directory
  function listFiles(storageRef) {
    return storageRef.listAll()
      .then((result) => {
        const promises = result.items.map(async (item) => {
          const url = await item.getDownloadURL();
          const fileName = item.name;
          return { fileName, url };
        });
        return Promise.all(promises);
      });
  }

  // Retrieve files from both directories
  Promise.all([listFiles(storageRef1), listFiles(storageRef2)])
    .then(([files1, files2]) => {
      const fileInfoArray = [...files1, ...files2]; // Combine the two arrays

      let img_all = "";
      fileInfoArray.forEach(({ fileName, url }) => {
        const startIndex = fileName.indexOf("<");
        const endIndex = fileName.indexOf(">");

        // Extract the text between angle brackets
        const price = fileName.substring(startIndex + 1, endIndex);

        let s = fileName.indexOf('{');
        let e = fileName.indexOf('}');
        let desc = fileName.substring(s + 1, e);
        let s1 = fileName.indexOf('|');
        let e1 = fileName.indexOf('|', s1 + 1);
        let n = fileName.substring(s1 + 1, e1);
        let s2 = fileName.indexOf('[');
        let e2 = fileName.indexOf(']');
        let user = fileName.substring(s2 + 1, e2);
        let usermail = localStorage.getItem("useremail");
        usermail = usermail.replace(/"/g, '');
        console.log(usermail);
        if (user == usermail) {
          img_all += `
            <div class="wrapper">
              <div class="container">
                <div class="top"><img class="image" src="${url}"></div>
                <div class="bottom">
                  <div class="left">
                    <div class="details">
                      <h1>${n}</h1>
                      <p>₹${price}</p>
                    </div>
                    <button value="${fileName}" onclick="deletebtn(event)" class="buy_btn">
                    🗑️
                    </button>
                  </div>
                </div>
              </div>
              <div class="inside">
                <div class="icon"><i class="material-icons">info_outline</i></div>
                <div class="contents">
                  <center>
                    <p>${desc}</p>
                  </center>
                </div>
              </div>
            </div>`;
        }
      });
      img_all = `<div class="parent">${img_all}</div>`;
      console.log(img_all);
      document.getElementById("allimages").innerHTML = img_all;
    })
    .catch((error) => {
      console.error('Error retrieving download URLs:', error);
    });
}

function deletebtn(event) {
  const fileName = event.target.value; // Get the file name from the button value
  console.log(`Deleting file: ${fileName}`);

  // Function to delete file from a given storage reference
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

  // Attempt to delete from 'img/' directory first
  let text = "Press OK to confirm deletion";
  if (confirm(text) == true) {

    const storageRefImg = firebase.storage().ref('img/' + fileName);
  deleteFile(storageRefImg).catch(() => {
    // If deletion from 'img/' fails, attempt to delete from 'auctionimg/'
    const storageRefAuctionImg = firebase.storage().ref('auctionimg/' + fileName);
    deleteFile(storageRefAuctionImg);
  });
  } 
  else {
    alert("item not deleted");
  }

  
}

retrieve();
