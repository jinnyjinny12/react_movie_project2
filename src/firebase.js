import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyClLP7HvkJxzzNzbqbk6ynXF3OqoRw0OaY",
    authDomain: "react-movie-project2.firebaseapp.com",
    projectId: "react-movie-project2",
    storageBucket: "react-movie-project2.appspot.com",
    messagingSenderId: "884152263555",
    appId: "1:884152263555:web:09bb48d335baf9dd55ccb6"
}

// firebase 초기화
const app = initializeApp(firebaseConfig);

// FirebaseStore
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

