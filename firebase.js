// ===============================
// Firebase
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAnscPWIyKJ6RTwh6JIoLVluQ0DSxQsPbQ",
    authDomain: "planificador-vacaciones-a5033.firebaseapp.com",
    projectId: "planificador-vacaciones-a5033",
    storageBucket: "planificador-vacaciones-a5033.firebasestorage.app",
    messagingSenderId: "331769046414",
    appId: "1:331769046414:web:e75f242e5f7554004630df",
    measurementId: "G-0443RLVG3T"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot
};
