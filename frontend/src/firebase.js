import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4DHl0_bJGLOjF6x5c1hXlC50E_W_qoPk",
  authDomain: "grocery-store-696ae.firebaseapp.com",
  projectId: "grocery-store-696ae",
  storageBucket: "grocery-store-696ae.firebasestorage.app",
  messagingSenderId: "150593864544",
  appId: "1:150593864544:web:3fd204f9f82710d8df5405",
};

const app = initializeApp(firebaseConfig);

// ✅ THESE EXPORTS FIX YOUR ERROR
export const auth = getAuth(app);
export const db = getFirestore(app);
