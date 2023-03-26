// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8F-H-D-kIFsItUMOh5KLezClABZ1lijQ",
  authDomain: "media-firewall-demo.firebaseapp.com",
  projectId: "media-firewall-demo",
  storageBucket: "media-firewall-demo.appspot.com",
  messagingSenderId: "898478893874",
  appId: "1:898478893874:web:5a36e5c9b0731c8172c52b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
