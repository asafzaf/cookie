// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "./firebaseCreds.json";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  try {
    // Attempt to sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    console.log("User Credential:", userCredential);
    
    // Return the signed-in user
    const user = userCredential.user;
    return user;

  } catch (error) {
    // Extract error information and log it
    let errorCode = error.code;
    let errorMessage = error.message;
    
    
    if (errorCode === "auth/invalid-credential") {
      // console.error("Invalid credentials");
      errorMessage = "Invalid credentials. Please check your email and password";
    }
    const errorObject = { errorCode, errorMessage };
    // console.error("Login Error:", errorObject);

    // Return the error object for further handling in the client
    return errorObject;
  }
};