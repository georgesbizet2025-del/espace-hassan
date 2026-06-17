import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJGtJj3steFUft-m3Ez3RR2JSfcSjDpQ",
  authDomain: "predictions-de-la-can-votes.firebaseapp.com",
  databaseURL: "https://predictions-de-la-can-votes-default-rtdb.firebaseio.com",
  projectId: "predictions-de-la-can-votes",
  storageBucket: "predictions-de-la-can-votes.firebasestorage.app",
  messagingSenderId: "330558772842",
  appId: "1:330558772842:web:310ad45ea254d32afc5c13",
  measurementId: "G-VVBXB10Q88"
};

const app = initializeApp(firebaseConfig);

// Initialize Analytics with a safety wrapper to prevent crash inside sandboxed iframe
export let analytics: any = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (e) {
  console.warn("Analytics initialization skipped or failed inside secure sandbox:", e);
}

export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-de2d2121-13c4-46cf-97b0-17553a6776ab");
