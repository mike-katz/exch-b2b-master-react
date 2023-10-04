import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_OTHERS_API_KEY,
  authDomain: process.env.REACT_APP_OTHERS_DOMAIN,
  projectId: process.env.REACT_APP_OTHERS_PROJECT_ID,
  storageBucket: process.env.REACT_APP_OTHERS_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_OTHERS_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_OTHERS_APP_ID,
  measurementId: process.env.REACT_APP_OTHERS_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig, "others");
export const auth = getAuth(app);
export const fireStoreOthers = getFirestore(app);
