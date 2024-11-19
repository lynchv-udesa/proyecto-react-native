import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA_H5WggjbrQlf2AJtxf22gDKFhvv1Bq-E",
    authDomain: "proyecto-react-native-7a497.firebaseapp.com",
    projectId: "proyecto-react-native-7a497",
    storageBucket: "proyecto-react-native-7a497.firebasestorage.app",
    messagingSenderId: "941551264576",
    appId: "1:941551264576:web:33840ee4452f7cd481d0a5"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
