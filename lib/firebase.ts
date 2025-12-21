import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXlabfPBleAxKoNrUtyHus-SBlG4HuKnM",
  authDomain: "driving-test-app-a5c67.firebaseapp.com",
  projectId: "driving-test-app-a5c67",
  storageBucket: "driving-test-app-a5c67.firebasestorage.app",
  messagingSenderId: "1089627691384",
  appId: "1:1089627691384:web:b9de8a0a2e267b3e68508d",
  measurementId: "G-28J0RC9MJ5"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
