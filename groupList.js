var db = null;
window.addEventListener("DOMContentLoaded", function () {
  db = firebase.firestore();
  readentry()
});

function readentry(){
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

function addcardcardwrapper(psuedostack){
for(var i=0;i<psuedostack.length;i++){
    addcard(psuedostack[i])
}
}

function addcard(name){
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


