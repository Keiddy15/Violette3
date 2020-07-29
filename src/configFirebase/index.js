import firebase from 'firebase';

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDWgF9hDM8eeNM4htLTgKIcDbezmJlqnL4",
    authDomain: "violette-efc12.firebaseapp.com",
    databaseURL: "https://violette-efc12.firebaseio.com",
    projectId: "violette-efc12",
    storageBucket: "violette-efc12.appspot.com",
    messagingSenderId: "292078428650",
    appId: "1:292078428650:web:087abcaf48f0c412179293"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
