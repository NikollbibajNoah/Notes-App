// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO6-GR0xSU-OlWdF6yjXd8GegDV63EC_U",
  authDomain: "notes-app-c7f9e.firebaseapp.com",
  databaseURL: "https://notes-app-c7f9e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "notes-app-c7f9e",
  storageBucket: "notes-app-c7f9e.firebasestorage.app",
  messagingSenderId: "48945123726",
  appId: "1:48945123726:web:3e4b365b89011b848094df",
  measurementId: "G-PDMKHTJ5S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);