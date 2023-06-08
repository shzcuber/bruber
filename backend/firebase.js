import * as dotenv from 'dotenv'
dotenv.config()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.SECRET_KEY,
  authDomain: "bruber-b655f.firebaseapp.com",
  projectId: "bruber-b655f",
  storageBucket: "bruber-b655f.appspot.com",
  messagingSenderId: "954731036862",
  appId: "1:954731036862:web:2260aa785228d5e4d1deef"
};



// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

//initialize auth
