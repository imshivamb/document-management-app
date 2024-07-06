// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqN1iHpEh5LMum869xvs2qzqY3IIvMchA",
  authDomain: "docuvault-app.firebaseapp.com",
  projectId: "docuvault-app",
  storageBucket: "docuvault-app.appspot.com",
  messagingSenderId: "354480075523",
  appId: "1:354480075523:web:a461bee8f5cdcdf2c92f36",
  measurementId: "G-5G7GKW68HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);