var db = null;
window.addEventListener("DOMContentLoaded", function () {
    db = firebase.firestore();
    readentry()
});

function readentry() {
    db.collection("user").document(firebase.auth.currentUser.uid).get().then((doc) => {
        if (doc.exists) {
            addcardcardwrapper(doc.data().group);
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function addcardcardwrapper(psuedostack) {
    for (var i = 0; i < psuedostack.length; i++) {
        addcard(psuedostack[i])
    }
}

function addcard(name) {
    var cardwrapper = document.getElementById("listholder")
    cardwrapper.innerHTML += `<li class="border-gray-400 flex flex-row mb-2">
    <div
      class="select-none flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
    >
      <div class="flex-1 pl-1 mr-16">
        <div class="font-medium">
          Product-Based Service Based or Hybrid?
        </div>
      </div>
      <div
        class="w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md bg-red-500 justify-center items-center mr-10 p-2"
      >
        B2C
      </div>
    </div>
  </li>`

}

function enableGroupForm() {
    alert = ("dnkjsdl");
    dc = document.getElementById("groupform");
    dc.style.display = "block";
}

function addinputfield() {
    var list = []
    var entry = document.getElementsByClassName("entry");
    for (var i = 0; i < entry.length; i++) {
        list.push(entry[i].value.trim());
    }

    var inputF = document.getElementById('inputfield')
    inputF.innerHTML += `<input type="Email" class="entry border w-full h-10 px-3 mb-5 rounded-md" placeholder="email">`

    for (var i = 0; i < entry.length - 1; i++) {
        entry[i].value = list[i];
    }
}

function addbtnpressed() {
    var name = document.getElementById("name").value.trim()
    var entry = document.getElementsByClassName("entry");
    if (name == "" || entry[0].value.trim() == "")
        alert("Please Enter complete Info")
    else {
        var list = [];
        for (var i = 0; i < entry.length; i++) {
            if (entry[i].value.trim() != "")
                list.push(entry[i].value.trim());
        }
        console.log(list)
        addentry(name, list)
    }
}

function addentry(name, list) {

    db.collection("group").add({
        name: name,
        list: list
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            var groupid= docRef.id;
            for (var i = 0; i < list.length; i++) {

                db.collection("user").doc(list[i])
                    .get().then((doc) => {
                        if (doc.exists) {
                            var group = doc.data().group;
                            group.push(groupid);
                            console.log(doc.id);
                            db.collection("user").doc(doc.id).update({
                                group: group
                            })
                                .then(() => {
                                    console.log("Document successfully updated!");

                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                });

                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            }
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}