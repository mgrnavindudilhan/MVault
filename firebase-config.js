// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyBorfzyBkRusslE5_ry4vFOlxQqjm_GpAM",
    authDomain: "nejk-dbfe3.firebaseapp.com",
    projectId: "nejk-dbfe3",
    storageBucket: "nejk-dbfe3.firebasestorage.app",
    messagingSenderId: "734318438715",
    appId: "1:734318438715:web:2963da771f3ad8fc8f2f1e",
    measurementId: "G-32T7ZJR0LR"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
