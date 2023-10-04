import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SOCCER_API_KEY,
  authDomain: process.env.REACT_APP_SOCCER_DOMAIN,
  projectId: process.env.REACT_APP_SOCCER_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SOCCER_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SOCCER_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_SOCCER_APP_ID,
  measurementId: process.env.REACT_APP_SOCCER_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig, "soccer");
export const auth = getAuth(app);
export const fireStoreSoccer = getFirestore(app);
