import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAEL4n_UNRKp8clABHI3Bfb4ix2JlES_Jo",
    authDomain: "how9-dc9ad.firebaseapp.com",
    projectId: "how9-dc9ad",
    storageBucket: "how9-dc9ad.appspot.com",
    messagingSenderId: "1026886099678",
    appId: "1:1026886099678:web:f782c9db713e23ccce984f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };