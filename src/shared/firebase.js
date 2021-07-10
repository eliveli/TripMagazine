import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgjb9A3EE5Q1rIk5WP9E7JyQbWjd4xAUA",
  authDomain: "calendar-3dcbc.firebaseapp.com",
  projectId: "calendar-3dcbc",
  storageBucket: "calendar-3dcbc.appspot.com",
  messagingSenderId: "457607141693",
  appId: "1:457607141693:web:bb4f8ba4d69a2e20930d54",
  measurementId: "G-PKP2CPYWWH"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};