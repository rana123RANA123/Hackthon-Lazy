import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBfEB3A_yWlHsUM7yT_-q5qQIZdDtYWbdg",
    authDomain: "hackathon-e4f6c.firebaseapp.com",
    projectId: "hackathon-e4f6c",
    storageBucket: "hackathon-e4f6c.appspot.com",
    messagingSenderId: "976884418176",
    appId: "1:976884418176:web:4fa55521a9aa7d1b0b4865",
    measurementId: "G-EYST4KCDF1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }