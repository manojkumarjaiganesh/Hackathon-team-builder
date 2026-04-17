// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYGMNaZ8EkHGExu_dJ_i2DcHBCfz3d22k",
  authDomain: "hackathon-team-builder-2cfa1.firebaseapp.com",
  projectId: "hackathon-team-builder-2cfa1",
 storageBucket: "hackathon-team-builder-2cfa1.firebasestorage.app",
  messagingSenderId: "594660565846",
  appId: "1:594660565846:web:4407bb6d73b35f9d742cf7",
  measurementId: "G-M7HYRB58RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (prevents crash if IndexedDB is full or blocked)
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics failed to initialize:", err);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, db, storage };
export default app;
