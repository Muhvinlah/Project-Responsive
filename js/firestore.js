import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvOM6KwAcJBjj7LGOY9hlPditaJ3gAKnQ",
    authDomain: "gcp-integration-425706.firebaseapp.com",
    databaseURL: "https://gcp-integration-425706-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gcp-integration-425706",
    storageBucket: "gcp-integration-425706.appspot.com",
    messagingSenderId: "529433350922",
    appId: "1:529433350922:web:4d18d1f2ff1dcabbf220f3",
    measurementId: "G-WDEGEW6P0V"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);