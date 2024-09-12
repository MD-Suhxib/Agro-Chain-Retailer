// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDfGmj96Ji1bhgB9HWd4VVwSO3KXXOc_rI",
    authDomain: "agro-chain-bbf19.firebaseapp.com",
    projectId: "agro-chain-bbf19",
    storageBucket: "agro-chain-bbf19.appspot.com",
    messagingSenderId: "608722432068",
    appId: "1:608722432068:web:8b272841d70cc4dc89cc11",
    measurementId: "G-JLZQ74CZXV"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
