var db = null;
var index = -1;
var users=[];
var myemail="";
var report=[];
window.addEventListener("DOMContentLoaded", function () {
  db = firebase.firestore();
  readentry()
  var date = document.getElementById("date")
  var newdate = new Date()
  var datenum = newdate.getDate()
  var month = newdate.getMonth()
  var year = newdate.getFullYear()
  var hr = newdate.getHours()
  var min = newdate.getMinutes()
  if (min.toString().length == 1)
    min = "0" + min
  if (hr.toString().length == 1)
    hr = "0" + hr
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  datesrtring = datenum + " " + months[month] + " " + year + " " + hr + ":" + min;
  date.innerHTML = datesrtring
}, false);
function addcardcardwrapper(name, list, price, description, date) {
  var newdate = new Date(date * 1000)
  var datenum = newdate.getDate()
  var month = newdate.getMonth()
  var year = newdate.getFullYear()
  var hr = newdate.getHours()
  var min = newdate.getMinutes()
  if (min.toString().length == 1)
    min = "0" + min
  if (hr.toString().length == 1)
    hr = "0" + hr
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var t = document.getElementById('cardwrapper')
  var liststring = "";
  for (var i = 0; i < list.length; i++) {
    liststring += `<p class="flex items-center text-gray-400 mb-2">
    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>`+ list[i] +
      `</p>`
  }
  datesrtring = datenum + " " + months[month] + " " + year + " " + hr + ":" + min;
  t.innerHTML = `<div class="p-4 xl:w-1/4 md:w-1/2 w-full">
    <div class="h-full p-6 rounded-lg border-2 border-green-500 flex flex-col relative overflow-hidden">
             <span class="bg-green-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">`+ datesrtring + `</span>
      <h2 class="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">`+ name + `</h2>
      <h1 class="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">`+ "₹ " + price + `</h1>` +
    liststring
    + `<button class="flex items-center mt-auto text-white bg-green-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-600 rounded">Button
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
      <p class="text-xs text-gray-400 mt-3">`+ description + `</p>
    </div>
  </div>`+ t.innerHTML;
}

//firebase
function addentry(name, list, price, description) {

  for(var i=0;i<report.length;i++){
    if(i==index){
      report[i]+=price/report.length;
    }
    else
    {
      report[i]-=price/report.length;
    }
  }
  
  
  // To update age and favorite color:
  db.collection("group").doc(localStorage.getItem("grouplink")).update({
    report: report
  })
    .then(() => {
      console.log("Document successfully updated!");
    });
  db.collection("group").doc(localStorage.getItem("grouplink")).collection("transaction").add({
    name: name,
    list: list,
    price: price,
    description: description,
    date: Math.floor(Date.now() / 1000)
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function readentry() {




  



  console.log(localStorage.getItem("grouplink"))

  var psuedostack = []
  db.collection("group").doc(localStorage.getItem("grouplink")).collection("transaction").orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        psuedostack.push([doc.data().name, doc.data().list, doc.data().price, doc.data().description, doc.data().date])
      });
      for (var i = psuedostack.length - 1; i >= 0; i--) {
        addcardcardwrapper(psuedostack[i][0], psuedostack[i][1], psuedostack[i][2], psuedostack[i][3], psuedostack[i][4])
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function readentryonces(name, list, amount, discription) {
  addcardcardwrapper(name, list, amount, discription, Math.floor(Date.now() / 1000))
}

//ui
function addinputfield() {
  var list = []
  var entry = document.getElementsByClassName("entry");
  for (var i = 0; i < entry.length; i++) {
    list.push(entry[i].value.trim());
  }

  var inputF = document.getElementById('inputfield')
  inputF.innerHTML += `<p class="flex items-center text-gray-400 mb-2" >
  <input
    class="entry w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    placeholder="New Entry" type="text" name="" id="entry">
</p>`

  for (var i = 0; i < entry.length - 1; i++) {
    entry[i].value = list[i];
  }
}
function addbtnpressed() {
  var name = document.getElementById("name").value.trim()
  var amount = document.getElementById("amount").value
  var discription = document.getElementById("discription").value
  var entry = document.getElementsByClassName("entry");
  if (amount == "" || entry[0].value.trim() == "")
    alert("Please Enter complete Info")
  else {
    var list = [];
    for (var i = 0; i < entry.length; i++) {
      if (entry[i].value.trim() != "")
        list.push(entry[i].value.trim());
    }
    console.log(list)
    addentry(firebase.auth().currentUser.email, list, amount, discription)
    clearinputfeilds()
    readentryonces(name, list, amount, discription)
  }
}
function clearinputfeilds() {
  document.getElementById("name").value = ""
  document.getElementById("amount").value = ""
  document.getElementById("discription").value = ""
  var entry = document.getElementsByClassName("entry");

  var inputF = document.getElementById('inputfield')
  inputF.innerHTML = `<p class="flex items-center text-gray-400 mb-2" >
  <input
    class="entry w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    placeholder="New Entry" type="text" name="" id="entry">
</p>`

}

window.addEventListener('DOMContentLoaded', (event) => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("group").doc(localStorage.getItem("grouplink")).get().then((doc) => {
          if (doc.exists) {
            console.log(doc.data().name);
            console.log(doc.id);
            users=doc.data().list;
            report=doc.data().report;
            for (var i = 0; i < users.length; i++) {
              if(users[i]==user.email){
                index=i;
                console.log(index);
                break;
              }
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      } else {

      }
  });
});