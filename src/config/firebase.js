import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyC_03YL7xEZrscM9i5OFhh5wMWwoKBLOzg",
  authDomain: "react-slack-clone-5b601.firebaseapp.com",
  databaseURL: "https://react-slack-clone-5b601.firebaseio.com",
  projectId: "react-slack-clone-5b601",
  storageBucket: "react-slack-clone-5b601.appspot.com",
  messagingSenderId: "904562752049",
  appId: "1:904562752049:web:745bca22d9254ce0077310",
  measurementId: "G-ZK6GNMBF2V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
