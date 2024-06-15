// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfg0-14rC4R8WEFdXcwNG8OPQrb9MbcPk",
  authDomain: "vue-retail-26dff.firebaseapp.com",
  projectId: "vue-retail-26dff",
  storageBucket: "vue-retail-26dff.appspot.com",
  messagingSenderId: "103644228593",
  appId: "1:103644228593:web:e0f53de5b0c326b773f250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }