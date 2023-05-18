// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// connecting to database
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcrl1eUhk5aeOE9qnqp67EfVea3SwrPhk",
    authDomain: "social-media-react-app-ead54.firebaseapp.com",
    projectId: "social-media-react-app-ead54",
    storageBucket: "social-media-react-app-ead54.appspot.com",
    messagingSenderId: "860730446553",
    appId: "1:860730446553:web:b703b1b7c063f0a38ba4c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// to sign in with google
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// db refernece
export const db = getFirestore(app);