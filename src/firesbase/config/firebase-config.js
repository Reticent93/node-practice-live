const {initializeApp} = require('firebase/app');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "livechair-1.firebaseapp.com",
    projectId: "livechair-1",
    storageBucket: "livechair-1.appspot.com",
    messagingSenderId: "1050440000000",
    appId: "1:1050440000000:web:0000000000000000000000",
}

const app = initializeApp(firebaseConfig);