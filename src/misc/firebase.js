import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

//copied from firebase
const config = {
    apiKey: "AIzaSyAo3lle-R0cr8Od6yIFrUza7TK0JoMjnMo",
    authDomain: "chat-web-app-ab1a1.firebaseapp.com",
    projectId: "chat-web-app-ab1a1",
    storageBucket: "chat-web-app-ab1a1.appspot.com",
    messagingSenderId: "652623501522",
    appId: "1:652623501522:web:d7338baa70bf9764a1b50b"
  };

  //variables created to hold firebase functions
  export const app = firebase.initializeApp(config);
  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();