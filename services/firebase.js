import auth from '@react-native-firebase/auth';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendEmailVerification,
//   // getAuth,
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_apiKey,
//   authDomain: process.env.EXPO_PUBLIC_authDomain,
//   projectId: process.env.EXPO_PUBLIC_projectId,
//   storageBucket: process.env.EXPO_PUBLIC_storageBucket,
//   messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
//   appId: process.env.EXPO_PUBLIC_appId,
//   measurementId: process.env.EXPO_PUBLIC_measurementId,
// };
// const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
// persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// // const FIREBASE_APP = initializeApp(firebaseConfig);
// // const auth = getAuth(FIREBASE_APP);

// export const signUp = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     // Signed in
//     const user = userCredential.user;
//     const res = await sendEmailVerification(user);
//     if (res) {
//       console.log("Email verification sent!");
//     } else {
//       console.log("Email verification not sent!");
//     }
//     return user;
//     // Email verification sent!
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const errorObject = { errorCode, errorMessage };
//     throw errorObject;
//   }
// };

// export const login = async (email, password) => {
//   try {
//     // Attempt to sign in with email and password
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     // Return the signed-in user
//     const user = userCredential.user;
//     return user;
//   } catch (error) {
//     // Extract error information and log it
//     let errorCode = error.code;
//     let errorMessage = error.message;

//     if (errorCode === "auth/invalid-credential") {
//       // console.error("Invalid credentials");
//       errorMessage =
//         "Invalid credentials. Please check your email and password";
//     }
//     const errorObject = { errorCode, errorMessage };
//     // console.error("Login Error:", errorObject);

//     // Return the error object for further handling in the client
//     return errorObject;
//   }
// };
