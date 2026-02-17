// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLD8QT0E8UB5xbs00CDTGw84X2QwT4Cbs",
  authDomain: "sayanan-fdaed.firebaseapp.com",
  projectId: "sayanan-fdaed",
  storageBucket: "sayanan-fdaed.firebasestorage.app",
  messagingSenderId: "187944837210",
  appId: "1:187944837210:web:de97db66bca2c492fcf863",
  measurementId: "G-HEK4HCP4GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)