import "firebase/auth";

import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

/* The firebase document was created to initialize the firebase project.
and the firebase credentials are store in a .env document to maintain data security */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

// PENDING - Deploy the app in firestore hosting with "firebase init" ( in the firebase init take care about the public folder ) and "firebase deploy".
