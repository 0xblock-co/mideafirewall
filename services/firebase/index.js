// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGsljcqNhhYMjvZdk9J792pyO4LbKQSpk",
    authDomain: "media-firewall.firebaseapp.com",
    projectId: "media-firewall",
    storageBucket: "media-firewall.appspot.com",
    messagingSenderId: "572156649371",
    appId: "1:572156649371:web:75ecb54b2ab1ba9db14b3e",
    measurementId: "G-EMK98NB7Y7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
