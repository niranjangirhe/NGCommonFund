
var db = null;
var myemail = "";
window.addEventListener("DOMContentLoaded", async function () {
    db = firebase.firestore();
});
async function readentry(myemail) {
    db.collection("user").doc(myemail).get().then((doc) => {
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
var nameList=[];
async function addcardcardwrapper(psuedostack) {
    for (var i = 0; i < psuedostack.length; i++) {
        await db.collection("group").doc(psuedostack[i]).get().then((doc) => {
            if (doc.exists) {
                addcard(doc.data().name,i)
                nameList.push(psuedostack[i]);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }
}

function addcard(name,i) {
    var cardwrapper = document.getElementById("listholder")
    cardwrapper.innerHTML += `<li class="border-gray-400 flex flex-row mb-2">
    <div onclick="openIndex(`+i+`)" 
      class="select-none flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-green-500"
    >
      <div class="flex-1" style="text-align:center;">
        <div class="font-medium text-gray-200">
         ` + name + `
        </div>
      </div>
    </div>
  </li>`

}
function openIndex(i)
{
    console.log(nameList[i]);
    localStorage.setItem("grouplink", nameList[i]);
    window.location.href = "index.html";
}

function enableGroupForm() {
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
    inputF.innerHTML += `<input type="Email" class="mt-3 w-full bg-gray-800 bg-opacity-40  rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="User Email">`

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

async function addentry(name, list) {

   await db.collection("group").add({
        name: name,
        list: list,
        report: Array(list.length).fill(0)
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            var groupid = docRef.id;
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
                                    window.location.reload();
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

window.addEventListener('DOMContentLoaded', (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            readentry(user.email);
        } else {

        }
    });
});
