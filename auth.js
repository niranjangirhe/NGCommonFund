//sign up
function signup() {
    email=document.getElementById("email").value
    password=document.getElementById("password").value
    username=document.getElementById("name").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = firebase.auth().currentUser;

            user.updateProfile({
              displayName: username
            }).then(() => {
              // Update successful
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
            });  

            alert("signed up")
            var list=[];
            firebase.firestore().collection("user").doc(firebase.auth().currentUser.email).set({
                    group: list
                })
                .then(() => {
                    console.log("Document successfully written!");
                    window.local.href = "groupList.html";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
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