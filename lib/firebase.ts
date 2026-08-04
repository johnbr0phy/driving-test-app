import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Our own domain (not the default *.firebaseapp.com) so the Google
// sign-in popup flow stays same-origin — Chrome on iOS partitions
// third-party storage and intermittently breaks the cross-origin
// handoff. next.config.ts proxies /__/auth/* to the Firebase helper.
// Must be the exact origin the app is served on (www — Vercel
// redirects the apex there, and the SDK drops popup responses that
// arrive from a different origin than this value). That same rule means
// the pinned domain BREAKS sign-in on any other origin (localhost,
// preview deploys): the helper is cross-origin there and the popup
// response is dropped as auth/popup-closed-by-user. So pin only on
// tigertest.io and use the Firebase-hosted helper everywhere else
// (works for every domain on the Firebase authorized-domains list).
const onProductionHost =
  typeof window !== "undefined" &&
  /(^|\.)tigertest\.io$/.test(window.location.hostname);

const firebaseConfig = {
  apiKey: "AIzaSyAXlabfPBleAxKoNrUtyHus-SBlG4HuKnM",
  authDomain: onProductionHost
    ? "www.tigertest.io"
    : "driving-test-app-a5c67.firebaseapp.com",
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
