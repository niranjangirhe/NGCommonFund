
var db = null;
var index = -1;
var users = [];
var username = [];
var myemail = "";
var report = [];
var psuedostack = [];
var editDocid;
var oldPrice;
var oldUser = [];
var oldindex;
var totalentries = 0;
var totalprice = 0;
var myspending = 0;
var templist = [];


window.addEventListener("DOMContentLoaded", function () {
  db = firebase.firestore();

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


function addcardcardwrapper(name, list, price, description, date, docid, index, tranUserList) {
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
    if (i != list.length - 1)
      liststring += `<p class="flex items-center text-gray-400 mb-2">
    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>`+ list[i] +
        `</p>`
    else
      liststring += `<p class="flex items-center text-gray-400 mb-2 pb-4 border-b border-gray-800">
    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>`+ list[i] +
        `</p>`
  }
  liststring += `<h2 class="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">Users involved</h2>`
  for (var i = 0; i < tranUserList.length; i++) {
    if (tranUserList[i])
      liststring += `<p class="flex items-center text-gray-400 mb-2">
    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>`+ username[i] +
        `</p>`
  }
  var buttoncode = ""
  if (name == firebase.auth().currentUser.displayName)
    buttoncode = `<button class="flex items-center mt-auto text-white bg-green-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-600 rounded" onclick="EditEntry('` + index + `','` + docid + `')">Edit
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
</button>`
  datesrtring = datenum + " " + months[month] + " " + year + " " + hr + ":" + min;
  t.innerHTML = `<div class="p-4 xl:w-1/4 md:w-1/2 w-full">
    <div class="h-full p-6 rounded-lg border-2 border-green-500 flex flex-col relative overflow-hidden">
             <span class="bg-green-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">`+ datesrtring + `</span>
      <h2 class="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">`+ name + `</h2>
      <h1 class="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">`+ "₹ " + price + `</h1>` +
    liststring
    + buttoncode + `
      <p class="text-xl text-gray-400 mt-3 border-t pt-3 border-gray-800">`+ description + `</p>
    </div>
  </div>`+ t.innerHTML;
}

//firebase
function addentry(name, list, price, description) {




  var userlist = [];
  var userdoc = document.getElementsByClassName("fc");
  var countuser = 0;
  for (var i = 0; i < userdoc.length; i++) {
    userlist.push(userdoc[i].checked)
    if (userdoc[i].checked)
      countuser++;
  }

  for (var i = 0; i < report.length; i++) {

    if (i == index) {
      if (userdoc[i].checked) {
        report[i] += (price * (countuser - 1)) / countuser;
      }
      else {
        report[i] += (price * (countuser)) / countuser;
      }
    }
    else {
      if (userdoc[i].checked) {
        report[i] -= price / countuser;
      }
    }

  }
  console.log(userlist);
  console.log(report);
  db.collection("group").doc(localStorage.getItem("grouplink")).update({
    report: report
  })
    .then(() => {
      totalentries++;
      totalprice += parseFloat(price);
      myspending += parseFloat(price);
      console.log("Document successfully updated!");
    });
  db.collection("group").doc(localStorage.getItem("grouplink")).collection("transaction").add({
    name: name,
    list: list,
    price: price,
    description: description,
    userlist: userlist,
    date: Math.floor(Date.now() / 1000)
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      addcardcardwrapper(name, list, price, description, Math.floor(Date.now() / 1000), docRef.id, psuedostack.length, userlist)
      hideLoader();
      window.scroll(0, 0);
      psuedostack.push([name, list, price, description, Math.floor(Date.now() / 1000), docRef.id, psuedostack.length, userlist]);
      console.log(psuedostack);

      updateStats()
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function readentry() {
  db.collection("group").doc(localStorage.getItem("grouplink")).collection("transaction").orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        totalentries++;
        totalprice += parseFloat(doc.data().price);
        if (doc.data().name == firebase.auth().currentUser.displayName)
          myspending += parseFloat(doc.data().price);
        psuedostack.push([doc.data().name, doc.data().list, doc.data().price, doc.data().description, doc.data().date, doc.id, psuedostack.length, doc.data().userlist])
      });
      console.log(psuedostack);
      for (var i = psuedostack.length - 1; i >= 0; i--) {
        addcardcardwrapper(psuedostack[i][0], psuedostack[i][1], psuedostack[i][2], psuedostack[i][3], psuedostack[i][4], psuedostack[i][5], psuedostack[i][6], psuedostack[i][7])
      }
      hideLoader();
      console.log(totalentries, totalprice, myspending, report[index]);
      updateStats();
      window.scroll(0, 0);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//display Stats
function updateStats() {
  console.log(totalentries, totalprice, myspending, report[index]);
  document.getElementById("totalentries").innerHTML = totalentries;
  document.getElementById("totalprice").innerHTML = "₹ " + totalprice.toFixed(2);
  document.getElementById("myspending").innerHTML = "₹ " + myspending.toFixed(2);
  document.getElementById("totalbalance").innerHTML = "₹ " + report[index].toFixed(2);
  updateReport()
}

//display basic report
function updateReport() {
  var rep = document.getElementById("report");
  var rep2 = document.getElementById("report2");
  rep.innerHTML = "";
  rep2.innerHTML = "";
  for (var i = 0; i < report.length; i++) {
    var color = "text-green-400";
    if (report[i] < 0) {
      color = "text-red-400";
    }
    rep.innerHTML += `<p class="flex items-center text-2xl mb-2">
    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>` + username[i] + `: ₹ <span class=" ` + color + ` "> ` + report[i].toFixed(2) +
      `</span></p>`;
  }

  for (var i = 0; i < report.length; i++) {
    templist.push([report[i], i]);
  }
  updatereportmax()
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] < b[0]) ? -1 : 1;
  }
}


//display update max report
function updatereportmax() {
  //console.log("===============================")
  for (var i = 0; i < templist.length; i++) {
    console.log(templist[i][0], templist[i][1]);
  }
  //console.log("-------------------------------")
  templist.sort(sortFunction);
  for (var i = 0; i < templist.length; i++) {
    console.log(templist[i][0], templist[i][1]);
  }
  var rep = document.getElementById("report2");
  var amount = 0;
  if (-templist[0][0] > templist[templist.length - 1][0]) {
    amount = templist[templist.length - 1][0];
    templist[templist.length - 1][0] = 0;
    templist[0][0] += amount;
  }
  else {
    amount = -templist[0][0];
    templist[0][0] = 0;
    templist[templist.length - 1][0] -= amount;
  }
  if (amount < 1)
    return
  rep.innerHTML += `<p class="flex items-center text-2xl mb-2">
    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>` + username[templist[0][1]] + ` should pay ` + amount.toFixed(2) + ` money to ` + username[templist[templist.length - 1][1]] +
    `</span></p>`;
  updatereportmax();
}
function scrolltoform() {
  window.scroll(0, document.getElementById("fillform").offsetTop - 30);
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

function addinputfieldmodal() {
  var list = []
  var entry = document.getElementsByClassName("entrymodal");
  for (var i = 0; i < entry.length; i++) {
    console.log(entry[i].value.trim())
    list.push(entry[i].value.trim());
  }

  var inputF = document.getElementById('inputfieldmodal')
  inputF.innerHTML += `<p class="flex items-center text-gray-400 mb-2" >
  <input
    class="entrymodal w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    placeholder="New Entry" type="text" name="" id="entrymodal">
</p>`

  for (var i = 0; i < entry.length - 1; i++) {
    entry[i].value = list[i];
  }
}



function addbtnpressed() {
  playLoader();
  var amount = document.getElementById("amount").value

  var discription = document.getElementById("discription").value
  var entry = document.getElementsByClassName("entry");
  if (amount == "" || entry[0].value.trim() == "") {
    alert("Please Enter complete Info")
    hideLoader();
    return
  }
  else if (amount <= 0) {
    alert("Amount should be greater than 0")
    hideLoader();
    return
  }
  else {
    var list = [];
    for (var i = 0; i < entry.length; i++) {
      if (entry[i].value.trim() != "")
        list.push(entry[i].value.trim());
    }
    if (list.length) {
      alert("Atleast one user should be checked")
      hideLoader();
      return
    }
    addentry(firebase.auth().currentUser.displayName, list, amount, discription)
    clearinputfeilds()
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
  //var label = document.getElementById("label");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("group").doc(localStorage.getItem("grouplink")).get().then((doc) => {
        if (doc.exists) {

          console.log(doc.data().name);
          console.log(doc.id);
          users = doc.data().list;
          report = doc.data().report;
          console.log(report);
          var label = document.getElementById("label");
          var labelmodal = document.getElementById("labelmodal");
          for (var i = 0; i < users.length; i++) {
            if (users[i] == user.email) {
              index = i;
            }

          }
          checklistfiller();
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

function EditEntry(index, id) {
  console.log(report);
  editDocid = id;
  oldindex = index;
  console.log(index)
  console.log(id)
  var amountmodal = document.getElementById("amountmodal");
  var discriptionmodal = document.getElementById("discriptionmodal");
  var entrymodal = document.getElementById("entrymodal");
  var mod = document.getElementsByClassName("mod");
  var inputfieldmodal = document.getElementById("inputfieldmodal");
  amountmodal.value = psuedostack[index][2];
  discriptionmodal.value = psuedostack[index][3];
  var inputF = document.getElementById('inputfieldmodal')
  inputF.innerHTML = "";
  for (var i = 0; i < psuedostack[index][1].length; i++) {
    inputF.innerHTML += `<p class="flex items-center text-gray-400 mb-2" >
  <input
    class="entrymodal w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    placeholder="New Entry" type="text" name="" id="entrymodal" value="`+ psuedostack[index][1][i] + `">
</p>`
  }
  for (var i = 0; i < mod.length; i++) {
    if (psuedostack[index][7][i]) {
      mod[i].checked = true;
    }
    else {
      mod[i].checked = false;
    }
  }
  openModal()
}

async function checklistfiller() {
  console.log(users)
  for (var i = 0; i < users.length; i++) {

    await db.collection("user").doc(users[i]).get().then((doc) => {
      if (doc.exists) {
        username.push(doc.data().name);
        label.innerHTML += `<label class="inline-flex items-center mt-3">
            <input type="checkbox" class="form-checkbox fc h-5 w-5 text-gray-400" checked><span class="ml-2 text-gray-400">`+ doc.data().name + `</span>
        </label>`

        labelmodal.innerHTML += `<label class="inline-flex items-center mt-3">
        <input type="checkbox" class="form-checkbox mod h-5 w-5 text-gray-400" checked><span class="ml-2 text-gray-400">`+ doc.data().name + `</span>
    </label>`;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  document.getElementById("greet").innerHTML = `Welcome ` + firebase.auth().currentUser.displayName + `!`;
  readentry()
}

//edit entry in Database
function editEntryDB() {
  var amount = document.getElementById("amountmodal").value
  var discription = document.getElementById("discriptionmodal").value
  var entry = document.getElementsByClassName("entrymodal");
  if (amount == "" || entry[0].value.trim() == "")
    alert("Please Enter complete Info")
  else {
    var list = [];
    for (var i = 0; i < entry.length; i++) {
      if (entry[i].value.trim() != "")
        list.push(entry[i].value.trim());
    }
    updateentry(firebase.auth().currentUser.displayName, list, amount, discription)
    clearinputfeilds()
  }
}


function updateentry(name, list, price, description) {
  console.log("old : " + psuedostack[oldindex])
  console.log("new : " + name + " " + list + " " + price + " " + description)
  console.log(report);
  var userlist = [];
  var userdoc = document.getElementsByClassName("mod");
  var countuser = 0;
  var oldcountuser = 0;
  for (var i = 0; i < userdoc.length; i++) {
    userlist.push(userdoc[i].checked)
    if (userdoc[i].checked)
      countuser++;
  }
  if (countuser == 0) {
    alert("Atleast one user should be checked")
    hideLoader();
    return
  }

  for (var i = 0; i < psuedostack[oldindex][7].length; i++) {
    if (psuedostack[oldindex][7][i])
      oldcountuser++;
  }

  console.log("old : " + oldcountuser)
  var userchange = false;
  for (var i = 0; i < psuedostack[oldindex][7].length; i++) {
    if (psuedostack[oldindex][7][i] != userlist[i]) {
      userchange = true;
    }
  }
  console.log("olduser : " + psuedostack[oldindex][7])
  if (psuedostack[oldindex][2] != price || userchange) {
    for (var i = 0; i < report.length; i++) {

      if (i == index) {
        if (psuedostack[oldindex][7][i]) {
          report[i] -= (psuedostack[oldindex][2] * (oldcountuser - 1)) / oldcountuser;
        }
        else {
          report[i] -= (psuedostack[oldindex][2] * (oldcountuser)) / oldcountuser;
        }
      }
      else {
        if (psuedostack[oldindex][7][i]) {
          report[i] += psuedostack[oldindex][2] / oldcountuser;
        }
      }
    }

    for (var i = 0; i < report.length; i++) {

      if (i == index) {
        if (userdoc[i].checked) {
          report[i] += (price * (countuser - 1)) / countuser;
        }
        else {
          report[i] += (price * (countuser)) / countuser;
        }
      }
      else {
        if (userdoc[i].checked) {
          report[i] -= price / countuser;
        }
      }

    }
  }

  console.log(report);

  db.collection("group").doc(localStorage.getItem("grouplink")).update({
    report: report
  })
    .then(() => {
      console.log("Document successfully updated!");
    });

  db.collection("group").doc(localStorage.getItem("grouplink")).collection("transaction").doc(editDocid).update({
    name: name,
    list: list,
    price: price,
    description: description,
    userlist: userlist,
    date: psuedostack[oldindex][4]
  })
    .then(() => {
      console.log("Document successfully updated!");
      window.location.reload();
    });

}




//delete entry
function deleteentry() {
  playLoader();
  console.log(report);
  var oldcountuser = 0;
  for (var i = 0; i < psuedostack[oldindex][7].length; i++) {
    if (psuedostack[oldindex][7][i])
      oldcountuser++;
  }



  for (var i = 0; i < report.length; i++) {

    if (i == index) {
      if (psuedostack[oldindex][7][i]) {
        report[i] -= (psuedostack[oldindex][2] * (oldcountuser - 1)) / oldcountuser;
      }
      else {
        report[i] -= (psuedostack[oldindex][2] * (oldcountuser)) / oldcountuser;
      }
    }
    else {
      if (psuedostack[oldindex][7][i]) {
        report[i] += psuedostack[oldindex][2] / oldcountuser;
      }
    }
  }


  console.log(report);

  db.collection("group").doc(localStorage.getItem("grouplink")).update({
    report: report
  })
    .then(() => {
      console.log("Document successfully updated!");
    });


  db.collection("group").doc(localStorage.getItem("grouplink")).collection("transaction").doc(editDocid).delete().then(() => {
    console.log("Document successfully deleted!");
    window.location.reload();
  }).catch((error) => {
    console.error("Error removing document: ", error);
    hideLoader();
  });

}

async function AddMember() {
  var extraMail = window.prompt("Enter the email of the person you want to add");
  if (extraMail != null) {
    playLoader();
    await db.collection("user").doc(extraMail)
      .get().then((doc) => {
        if (doc.exists) {
          var group = doc.data().group;
          group.push(localStorage.getItem("grouplink"));
          console.log(doc.id);
          db.collection("user").doc(doc.id).update({
            group: group
          })
            .then(() => {
              console.log("Document successfully updated!");
              db.collection("group").doc(localStorage.getItem("grouplink"))
                .get().then((doc) => {
                  if (doc.exists) {
                    var list = doc.data().list;
                    var report = doc.data().report;
                    report.push(0);
                    list.push(extraMail);
                    db.collection("group").doc(localStorage.getItem("grouplink")).update({
                      list: list,
                      report: report
                    })
                      .then(() => {
                        console.log("Document successfully updated!");
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.error("Error updating document: ", error);
                        hideLoader();
                        return;
                      });

                  } else {
                    console.log("No such document!");
                    hideLoader();
                    return;
                  }
                }).catch((error) => {
                  console.log("Error getting document:", error);
                  hideLoader();
                  return;
                });
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              hideLoader();
              return;
            });

        } else {
          console.log("No such document!");
          alert(extraMail + ": User not found")
          hideLoader();
          return;
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
        hideLoader();
        return;
      });
  }
}