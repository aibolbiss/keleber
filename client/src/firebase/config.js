// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvASOytuRbQ2sOf_xPawaOkeVLQ7x_LWQ',
  authDomain: 'keleber-application.firebaseapp.com',
  projectId: 'keleber-application',
  storageBucket: 'keleber-application.appspot.com',
  messagingSenderId: '278717322198',
  appId: '1:278717322198:web:328612b22b8e0b081a4a77',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
