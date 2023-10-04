import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_CRICKET_API_KEY,
  authDomain: process.env.REACT_APP_CRICKET_DOMAIN,
  projectId: process.env.REACT_APP_CRICKET_PROJECT_ID,
  storageBucket: process.env.REACT_APP_CRICKET_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_CRICKET_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_CRICKET_APP_ID,
  measurementId: process.env.REACT_APP_CRICKET_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig, "cricket");
export const auth = getAuth(app);
export const fireStoreCricket = getFirestore(app);
