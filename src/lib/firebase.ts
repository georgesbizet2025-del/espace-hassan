import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "generated-plane-41b2m",
  appId: "1:713457978592:web:8146ee6debab6e12d71485",
  apiKey: "AIzaSyDIp2ISePW5c0t_Jq6QCZsMJ2x701LEt5E",
  authDomain: "generated-plane-41b2m.firebaseapp.com",
  storageBucket: "generated-plane-41b2m.firebasestorage.app",
  messagingSenderId: "713457978592",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-de2d2121-13c4-46cf-97b0-17553a6776ab");
