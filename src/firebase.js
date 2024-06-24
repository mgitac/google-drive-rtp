import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAkR2e9ET2YcmWCsf6ILp7RRrBQheG7jp4",
    authDomain: "drive-yt-c0159.firebaseapp.com",
    projectId: "drive-yt-c0159",
    storageBucket: "drive-yt-c0159.appspot.com",
    messagingSenderId: "440381187647",
    appId: "1:440381187647:web:a0f164ddc11842aadcfa8a",
    measurementId: "G-BKGBLRT911"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider }