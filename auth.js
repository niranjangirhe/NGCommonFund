//sign up
function signup() {
    playLoader();
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    username = document.getElementById("name").value
    loading = document.getElementById("loading")
    loading.style.display = "block"
    password2 = document.getElementById("password2").value
    if (password != password2) {
        alert("Passwords do not match")
        hideLoader();
        loading.style.display = "none"
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
                        window.location.href = "groupList.html";
                    })
                    .catch((error) => {
                        hideLoader();
                        loading.style.display = "none"
                        console.error("Error writing document: ", error);
                    });
            }).catch((error) => {
                hideLoader();
                loading.style.display = "none"
                // An error occurred
                // ...
            });


        })
        .catch((error) => {
            hideLoader();
            loading.style.display = "none"
            alert(error.message)
        });
}

//login
function login() {
    playLoader();
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    loading = document.getElementById("loading")
    loading.style.display = "block"
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = "groupList.html";
        })
        .catch((error) => {

            hideLoader();
            alert(error.message);
            loading.style.display = "none"
        });
}

//logout
function logout() {
    playLoader();
    firebase.auth().signOut()
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            hideLoader();
            alert(error.message)
        });
}


window.addEventListener('DOMContentLoaded', (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            
        } else {
            hideLoader();
            if (!window.location.href.includes("login.html") && !window.location.href.includes("signup.html"))
                window.location.href = "login.html"
        }
    });
});