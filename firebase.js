import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm1IfuwqnahMn6AeztWbB6qWXrmoQSKo4",
  authDomain: "bikeapp-780bf.firebaseapp.com",
  databaseURL: "https://bikeapp-780bf-default-rtdb.firebaseio.com",
  projectId: "bikeapp-780bf",
  storageBucket: "bikeapp-780bf.appspot.com",
  messagingSenderId: "680487900246",
  appId: "1:680487900246:web:0ee4b6e5534c92800757f7",
  measurementId: "G-89WT8T7WD4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
