import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBOuFITykcwW-0f6cH5pTAgmXDBudGWtWY",
  authDomain: "yaaaaaaa-bd1af.firebaseapp.com",
  projectId: "yaaaaaaa-bd1af",
  storageBucket: "yaaaaaaa-bd1af.appspot.com",
  messagingSenderId: "931812794187",
  appId: "1:931812794187:web:ed949a3da057544a42d2ce"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };