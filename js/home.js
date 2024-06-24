import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, set, get, update, remove, push, ref, child, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const dbRef = ref(getDatabase());

get(child(dbRef, "News")).then((snapshot) => {
    if (snapshot.exists()) {
      const newsData = snapshot.val();
      const newsContainer = document.getElementById('news');

    // Iterate through each news item
    Object.keys(newsData).forEach((key) => {
      const { ArticleImage, ArticleTitle, CreatedAt, ArticleContent } = newsData[key];

      // Create HTML elements for each news item
      const articleDiv = document.createElement('article');
      articleDiv.classList.add('p-md-5'); // Optional: Add a class for styling
      articleDiv.classList.add('text-body-emphasis');
      articleDiv.classList.add('border-end');

      const imageElement = document.createElement('img');
      imageElement.src = ArticleImage;
      imageElement.alt = ArticleTitle; // Optional: Add alt text
      imageElement.classList.add('img-fluid')

      const titleElement = document.createElement('a');
      titleElement.textContent = ArticleTitle;
      titleElement.href = "berita.html";
      titleElement.classList.add('nav-item');
      titleElement.classList.add('nav-link');
      titleElement.classList.add('link-body-emphasis');
      titleElement.classList.add('fs-1');
      titleElement.classList.add('fst-italic');
      titleElement.classList.add('text-capitalize');

      const dateElement = document.createElement('p');
      dateElement.textContent = `Published on: ${CreatedAt}`;

      const contentElement = document.createElement('p');
      const maxLength = 100; // Set the maximum length for the article content
      contentElement.textContent = ArticleContent.length > maxLength 
        ? ArticleContent.substring(0, maxLength) + '...' 
        : ArticleContent;
      contentElement.classList.add('my-3');
      contentElement.classList.add('text-muted');

      // Append elements to the news container
      articleDiv.appendChild(imageElement);
      articleDiv.appendChild(titleElement);
      articleDiv.appendChild(dateElement);
      articleDiv.appendChild(contentElement);

      newsContainer.appendChild(articleDiv);
    });
    } else {
      console.log("No data available");
    }
}).catch((error) => {
  console.error(error);
});