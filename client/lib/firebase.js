"use client";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Eğer Analytics kullanmak isterseniz, import satırını açabilirsiniz:
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCjj4o0tg9EFTzLDBAtc6QPhR8DW29RiO4",
  authDomain: "dgtlface-1.firebaseapp.com",
  projectId: "dgtlface-1",
  storageBucket: "dgtlface-1.firebasestorage.app", // "dgtlface-1.appspot.com"
  messagingSenderId: "657312939886",
  appId: "1:657312939886:web:063b4189d46ff4bd368b7f",
  measurementId: "G-E7C73FVJ06",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
if (typeof window !== "undefined") {
  auth = getAuth(app);
} else {
  auth = null;
}

const storage = getStorage(app);


// let analytics = null;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export { db, auth, storage, analytics };
