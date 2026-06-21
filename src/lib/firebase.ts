import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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
    const isIframe = window.self !== window.top;
    const isDevPreview = window.location.hostname.includes('localhost') || 
                         window.location.hostname.includes('127.0.0.1') || 
                         window.location.hostname.includes('run.app') || 
                         window.location.hostname.includes('google.com') ||
                         window.location.hostname.includes('webcontainer');
                         
    if (!isIframe && !isDevPreview) {
      analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics skipped in sandboxed / preview iframe or development context.");
    }
  }
} catch (e) {
  console.warn("Analytics initialization skipped or failed inside secure sandbox:", e);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
