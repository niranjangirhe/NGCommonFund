//sign up
function signup() {
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    username = document.getElementById("name").value
    loading = document.getElementById("loading")
    loading.style.display = "block"
    password2= document.getElementById("password2").value
    if (password != password2) {
        alert("Passwords do not match")
        location.reload()
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: username
            }).then(() => {

                var list = [];
                firebase.firestore().collection("user").doc(firebase.auth().currentUser.email).set({
                    group: list,
                    name: username
                })
                    .then(() => {
                        console.log("Document successfully written!");
                        alert("Signed up")
                        window.location.href = "login.html";
                    })
                    .catch((error) => {
                        loading.style.display = "none"
                        console.error("Error writing document: ", error);
                    });
            }).catch((error) => {
                loading.style.display = "none"
                // An error occurred
                // ...
            });


        })
        .catch((error) => {
            loading.style.display = "none"
            alert(error.message)
        });
}

//login
function login() {
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    loading = document.getElementById("loading")
    loading.style.display = "block"
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Logged in")
            window.location.href = "groupList.html";
        })
        .catch((error) => {

            alert(error.message);
            loading.style.display = "none"
        });
}

//logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            alert("Signed out")
            window.location.href = "login.html";
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