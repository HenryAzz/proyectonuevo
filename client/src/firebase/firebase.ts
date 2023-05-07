//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// fireStore
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
