import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCneyApuAhmwp8JWOFWMoGtDLXqrp98l3s",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ttms-457c5.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ttms-457c5",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ttms-457c5.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "522864839294",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:522864839294:web:b2fb66e95c5a79212f662f",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-Q4NSDWWW47"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
