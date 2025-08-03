// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from 'dotenv';

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app;
let auth;

// Validate that all required environment variables are set
if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    // Initialize Firebase
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
} else {
    console.warn("Firebase config is missing. Authentication features will be disabled. Make sure you have a .env.local file with your Firebase credentials.");
    // Provide mock objects if Firebase is not initialized
    app = null;
    auth = null;
}


export { app, auth };
