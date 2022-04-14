//sign up
function signup() {
    email=document.getElementById("email").value
    password=document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("signed up")
            var db = firebase.firestore();
            var list=[];
            db.collection("user").doc(firebase.auth().currentUser.toString()).set({
                group: list
              })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
        })
        .catch((error) => {
           alert(error.message)
        });
}

//login
function login() {
    email=document.getElementById("email").value
    password=document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("signed in")
        })
        .catch((error) => {
            
            alert(error.message);
            
        });
}

//logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            alert("signed out")
        })
        .catch((error) => {
           alert(error.message)
        });
}


// window.addEventListener('DOMContentLoaded', (event) => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             if(!window.location.href.toString().includes("index.html"))
//                 window.location.href = "index.html"
//         } else {
//            if(window.location.href.toString().includes("index.html")){  
//             window.location.href = "login.html"
//           }
//         }
//     });
// });