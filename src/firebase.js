// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4T_SwWBfxdXOwA6xBeLRpg6_47s-J4Mo",
  authDomain: "shoplist-fa5f9.firebaseapp.com",
  projectId: "shoplist-fa5f9",
  storageBucket: "shoplist-fa5f9.appspot.com",
  messagingSenderId: "231315418160",
  appId: "1:231315418160:web:1cfeaa02a3c2edf57e51f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const shoplistsCollection = collection(db, "shoplist");
