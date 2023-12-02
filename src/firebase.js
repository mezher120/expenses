// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVpqLTA8c883z5pav9LpxA9pHKwdGeB-4",
  authDomain: "gestor-gastos-ba934.firebaseapp.com",
  projectId: "gestor-gastos-ba934",
  storageBucket: "gestor-gastos-ba934.appspot.com",
  messagingSenderId: "363280632906",
  appId: "1:363280632906:web:408d2a7715755765806ab3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

