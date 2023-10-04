import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TENNIS_API_KEY,
  authDomain: process.env.REACT_APP_TENNIS_DOMAIN,
  projectId: process.env.REACT_APP_TENNIS_PROJECT_ID,
  storageBucket: process.env.REACT_APP_TENNIS_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_TENNIS_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_TENNIS_APP_ID,
  measurementId: process.env.REACT_APP_TENNIS_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig, "tennis");
export const auth = getAuth(app);
export const fireStoreTennis = getFirestore(app);
