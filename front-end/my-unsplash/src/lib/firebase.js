// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwc-b-SlqSKVniruoz55BBtUbct2mqXwc",
  authDomain: "my-unsplash-391818.firebaseapp.com",
  projectId: "my-unsplash-391818",
  storageBucket: "my-unsplash-391818.appspot.com",
  messagingSenderId: "56222301878",
  appId: "1:56222301878:web:560dcbc1a725d330eeb017",
  measurementId: "G-N604C6EYSC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);