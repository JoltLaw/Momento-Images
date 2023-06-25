// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAIKQhr3fhepeUGOnkbk4h8etGxdlLL2ck",
//   authDomain: "momento-abec4.firebaseapp.com",
//   projectId: "momento-abec4",
//   storageBucket: "momento-abec4.appspot.com",
//   messagingSenderId: "963450257428",
//   appId: "1:963450257428:web:1742443e83429aa39b2701",
//   databaseURL: "https://momento-abec4-default-rtdb.firebaseio.com/",
// };
const firebaseConfig = {
  apiKey: "AIzaSyC6IdSwAqQ3ES_320f5Zx9YmEIFEa_z_NA",
  authDomain: "mirgratedfirebase.firebaseapp.com",
  projectId: "mirgratedfirebase",
  storageBucket: "mirgratedfirebase.appspot.com",
  messagingSenderId: "552384170071",
  appId: "1:552384170071:web:2f002014b4691c1f397b12",
  databaseURL: "https://mirgratedfirebase-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app, "gs://mirgratedfirebase.appspot.com/");
const db = getDatabase(app);

export { auth, storage, db };
// Initialize Firebase
