import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6lfID-RhGaMN2_bMhw0qTkUBzSnK4K6w",
  authDomain: "loginauth-8cd33.firebaseapp.com",
  projectId: "loginauth-8cd33",
  storageBucket: "loginauth-8cd33.appspot.com",
  messagingSenderId: "302390237965",
  appId: "1:302390237965:web:5d668c0a3968567bffee44"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app)
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut , db};
