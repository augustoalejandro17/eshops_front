import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   appId: process.env.REACT_APP_FIREBASE_MEASURAMENT_ID
// })

const firebaseConfig = {
    apiKey: "AIzaSyDdDZpUIJCeTA7lJ68JoBxxPUaAVq9GtA4",
    authDomain: "eshops-front.firebaseapp.com",
    projectId: "eshops-front",
    storageBucket: "eshops-front.appspot.com",
    messagingSenderId: "386940082943",
    appId: "1:386940082943:web:5fd72581ab9d1042658aca",
    measurementId: "G-S9QZ6WCR9N"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

export const auth = getAuth()
export default app