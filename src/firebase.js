import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC0WH1RAIZgZ7c4x4xBV9Z8lubD0ERTXww",
    authDomain: "reactbrief.firebaseapp.com",
    projectId: "reactbrief",
    storageBucket: "reactbrief.appspot.com",
    messagingSenderId: "89393018283",
    appId: "1:89393018283:web:36803f13565088308e8eee",
    measurementId: "G-BNHYDJ1HG5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);
const auth = getAuth(app);
export { db, storage,auth };
