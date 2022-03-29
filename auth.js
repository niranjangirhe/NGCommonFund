//sign up
function signup() {
    //alert("nkdjsvbfkfdsj")
    email=document.getElementById("email").value
    password=document.getElementById("password").value
    alert(email,password)
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