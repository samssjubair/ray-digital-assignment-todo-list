// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDSPNEcAW1-Q7PKmdEVXNFn9lfNig32q3w",
  authDomain: "todo-assignment-a25cf.firebaseapp.com",
  projectId: "todo-assignment-a25cf",
  storageBucket: "todo-assignment-a25cf.appspot.com",
  messagingSenderId: "227993946266",
  appId: "1:227993946266:web:f119a56c0fa984098b3723",
  measurementId: "G-W3KKG4C8YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();

export {auth, provider};