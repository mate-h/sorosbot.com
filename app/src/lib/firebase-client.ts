import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { browser } from '$app/env';

const firebaseConfig = {
  apiKey: "AIzaSyCwBM6pEe6m09J8hLco4Dzsc_9bDkxrpwg",
  authDomain: "mate-h.firebaseapp.com",
  databaseURL: "https://mate-h-default-rtdb.firebaseio.com",
  projectId: "mate-h",
  storageBucket: "mate-h.appspot.com",
  messagingSenderId: "331430486427",
  appId: "1:331430486427:web:f7ee7bc83e17149184413e",
  measurementId: "G-VD8F0QFKE3"
};

export let app;
export let auth;

if (browser) {
  app = initializeApp(firebaseConfig);
  auth = getAuth();
}