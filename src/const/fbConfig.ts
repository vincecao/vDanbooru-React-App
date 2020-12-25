import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'vdanbooru.firebaseapp.com',
  databaseURL: 'https://vdanbooru.firebaseio.com',
  projectId: 'vdanbooru',
  storageBucket: 'vdanbooru.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_APIKEY,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
//   firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;
