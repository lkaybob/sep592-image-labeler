const fs = require("fs");
let firebase = require("firebase/app");
require("firebase/firestore");

let app = firebase.initializeApp({
  apiKey: "AIzaSyAa6WpXJ5QJFTL5Y4jW2aAwdVyLF4yzHDs",
  authDomain: "sep592-data-science.firebaseapp.com",
  databaseURL: "https://sep592-data-science.firebaseio.com",
  projectId: "sep592-data-science",
  storageBucket: "sep592-data-science.appspot.com",
  messagingSenderId: "850651271785",
  appId: "1:850651271785:web:3ac9f9afaa83aecb"
});
let db = app.firestore();
let batch = db.batch();
let items = JSON.parse(fs.readFileSync("./result"));
// items = items.slice(18300);
let data = {
  cuteness: null
};
let length = 0, times = 0;

items.forEach(function (element) {
  let ref = db.collection("dogs").doc(element);
  batch.set(ref, data);
  length++;

  if (length % 300 === 0) {
    batch.commit().then(() => {
      // eslint-disable-next-line no-console
      console.log(`Completed ${times++}`);
    });
    batch = db.batch();
    length = 0;
  }
});

batch.commit().then(() => {
  // eslint-disable-next-line no-console
  console.log(`Completed Last`);
  return true;
});
