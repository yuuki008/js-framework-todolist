import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA6VapaFz2osEUXArmazrp98sus_7i2lrA",
  authDomain: "front-todos.firebaseapp.com",
  projectId: "front-todos",
  storageBucket: "front-todos.appspot.com",
  messagingSenderId: "321707641656",
  appId: "1:321707641656:web:1ea3e209b0d332175d0fcd",
  measurementId: "G-MPVN8308GK"
};

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()