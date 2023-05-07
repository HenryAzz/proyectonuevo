import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfu--UA-DmgzujZyv73li-hrnvI1aBb3g",
  authDomain: "proptech-ed2ba.firebaseapp.com",
  projectId: "proptech-ed2ba",
  storageBucket: "proptech-ed2ba.appspot.com",
  messagingSenderId: "439431281615",
  appId: "1:439431281615:web:f76fa27bfb3c6be0f8b0ba",
  measurementId: "G-VC1Z71ND7G",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider, db, firebase };