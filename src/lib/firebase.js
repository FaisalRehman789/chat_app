/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-app-8fb23.firebaseapp.com",
  projectId: "react-chat-app-8fb23",
  storageBucket: "react-chat-app-8fb23.appspot.com",
  messagingSenderId: "1016824450993",
  appId: "1:1016824450993:web:f58ec5fdce61f00d28b790",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Initialize auth with `app`
export const db = getFirestore(app); // Initialize firestore with `app`
export const storage = getStorage(app); // Initialize storage with `app`
