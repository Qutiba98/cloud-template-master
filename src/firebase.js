// Import the necessary Firebase services
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage for Firebase Storage
import { getAuth } from 'firebase/auth';
// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyC0WH1RAIZgZ7c4x4xBV9Z8lubD0ERTXww",
    authDomain: "reactbrief.firebaseapp.com",
    projectId: "reactbrief",
    storageBucket: "reactbrief.appspot.com",
    messagingSenderId: "89393018283",
    appId: "1:89393018283:web:36803f13565088308e8eee",
    measurementId: "G-BNHYDJ1HG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);
const auth = getAuth(app);
// Export both Firestore and Storage
export { db, storage,auth };
