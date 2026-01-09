import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyA2d8LApywbcUMORHZB0lIpcWQu-KrtHqs",
  authDomain: "meucontrolefinanceiro-94d3a.firebaseapp.com",
  projectId: "meucontrolefinanceiro-94d3a",
  storageBucket: "meucontrolefinanceiro-94d3a.firebasestorage.app",
  messagingSenderId: "592355024628",
  appId: "1:592355024628:web:73c5d3b32902f0534288a1",
  measurementId: "G-94T3P0XC7M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
