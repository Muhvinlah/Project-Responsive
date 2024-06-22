import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, set, get, update, remove, push, ref as databaseRef, child, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
// import { getFirestore, collection, getDocs, doc, addDoc, deleteDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();
// const firestore = getFirestore(app);
const storage = getStorage(app);

// PROSES MEMBUAT ARTIKEL
document.addEventListener("DOMContentLoaded", () => {
   // Mendapatkan elemen input
   const articleTitleInput = document.querySelector("#title");
   const articleContentInput = document.querySelector("#article");
   const articleImageInput = document.querySelector("#newsBanner");

   // Tombol submit
   const createArticleBtn = document.querySelector("#publishBtn");
 
   // Inisialisasi fungsi untuk membuat artikel
   const createArticle = async () => {
      // Mendapatkan file gambar yang diunggah
      const imageFile = articleImageInput.files[0];
      // Upload gambar ke Firebase Storage
      const storageReference = storageRef(storage, 'images/' + articleTitleInput);
      await uploadBytes(storageReference, imageFile);

      // Mendapatkan URL gambar yang diunggah
      const imageURL = await getDownloadURL(storageReference);
 
       // Jika input tidak terisi maka tampilkan pesan error 
      if (!imageFile || !articleTitleInput.value || !articleContentInput.value) {
         alert("Please fill out all fields");
         return;
      }
 
       // Menyimpan data artikel ke Firebase Realtime Database
       await set(push(databaseRef(db, "News")), {
          ArticleTitle: articleTitleInput.value,
          ArticleContent: articleContentInput.value,
          ArticleImage: imageURL, // Menyimpan URL gambar
          CreatedAt: new Date().toUTCString()
       })
          .then(() => {
             // Menampilkan pesan sukses
             alert("Article created successfully!");
             window.location.reload();
          })
          .catch((error) => {
             // Menampilkan pesan error
             alert("Error creating article: " + error);
          });
    };
 
    // Menjalankan fungsi createRecipe ketika tombol create recipe ditekan
    createArticleBtn.addEventListener("click", (event) => {
       event.preventDefault(); // Mencegah halaman untuk reload atau action default lainnya
       createArticle();
    });
 });