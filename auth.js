//sign up
function signup() {
    //alert("nkdjsvbfkfdsj")
    email=document.getElementById("email").value
    password=document.getElementById("password").value
    //alert(email,password)
    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}

//login
function login() {
    email=document.getElementById("email").value
    password=document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}

//logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
}

firebase.auth().onAuthStateChanged(function(user) {
    console.log("user")
    if (user) {
        // User is signed in.
        window.location.href = "login.html";
        // ...
    } else {
        // User is signed out.
        // ...
        if(window.location.href=="index.html"){
            window.location.href = "login.html";
        }
    }
});
