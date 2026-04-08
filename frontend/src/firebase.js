// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
export default app;