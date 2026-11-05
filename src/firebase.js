// firebase.js
// This file initializes Firebase and exports the db object.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDFzwRmTxa0KZ-VQJG2hkFmiiNAGFbZII",
  authDomain: "framing-norah.firebaseapp.com",
  projectId: "framing-norah",
  storageBucket: "framing-norah.appspot.com",
  messagingSenderId: "759041180467",
  appId: "1:759041180467:web:85a08f0c3fc9b7210fb446",
  measurementId: "G-GMDL8DNF7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);

console.log (db);

export { db };