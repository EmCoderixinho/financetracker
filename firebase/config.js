import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ0A35V6-BrQkuGWhGLnhKxY8QEvxWX3c",
  authDomain: "mymoney-43844.firebaseapp.com",
  projectId: "mymoney-43844",
  storageBucket: "mymoney-43844.appspot.com",
  messagingSenderId: "576197629671",
  appId: "1:576197629671:web:b33c39c0423824a1147442",
};

// Check if Firebase app is not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
