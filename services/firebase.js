// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt8OUegN1bS4YhzepLDrhUeFSn7-fIQw4",
  authDomain: "cookie-147c5.firebaseapp.com",
  projectId: "cookie-147c5",
  storageBucket: "cookie-147c5.appspot.com",
  messagingSenderId: "550727993258",
  appId: "1:550727993258:web:3072abaa6469031988cdd3",
  measurementId: "G-YS3NDVV28S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

console.log("auth:", auth);
// const user = auth.currentUser;

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed up
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const errorObject = { errorCode, errorMessage };
    throw errorObject;
  }
};

export const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const errorObject = { errorCode, errorMessage };
  }
};
