import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyATgsDpBKcRd99mgOwHuTN4LhA1EeP5oGA",
  authDomain: "employee-portal-9b0ce.firebaseapp.com",
  projectId: "employee-portal-9b0ce",
  storageBucket: "employee-portal-9b0ce.appspot.com",
  messagingSenderId: "51605055395",
  appId: "1:51605055395:web:2f54bd8d9d6a1ec3665c16"
};

firebase.initializeApp(firebaseConfig);
export const adminAuth = firebase.initializeApp(firebaseConfig, "admin").auth();
export const auth = firebase.auth();
export const db = firebase.firestore();
