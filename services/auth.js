import axios from "axios";
import { handleAxiosError } from "../http/axios.error";

import firebase from "@react-native-firebase/app";

// If not initialized, manually initialize (should rarely be needed)
if (!firebase.apps.length) {
  firebase.initializeApp();
  console.log("Firebase initialized");
}

import auth from "@react-native-firebase/auth";

export const signUp = async (first_name, email, password) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const user = response.user;

    await user.updateProfile({
      displayName: first_name,
    });

    await user.sendEmailVerification();

    return response;
  } catch (error) {
    handleAxiosError("signUp", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return response;
  } catch (error) {
    handleAxiosError("login", error);
    console.log("Error code:", error.code);
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await auth().signOut();
    return response;
  } catch (error) {
    handleAxiosError("logout", error);
    throw error;
  }
};

// // import Constants from "expo-constants";

// // let credFile = {};

// // try {
// //   credFile = require("../config/creds.json");
// // } catch (error) {
// //   if (error.code === "MODULE_NOT_FOUND") {
// //     console.log("creds.json not found. Using environment variables instead.");
// //   } else {
// //     console.error("An error occurred while loading creds.json:", error);
// //   }
// // }

// // let parsedCredFile = {};

// // if (process.env.CRED_FILE) {
// //   try {
// //     file = process.env.CRED_FILE;
// //     console.log("CRED_FILE environment variable found.");
// //     parsedCredFile = JSON.parse(file);
// //     console.log("Parsed CRED_FILE environment variable.");
// //   } catch (e) {
// //     console.error("Failed to parse CRED_FILE environment variable:", e);
// //   }
// // } else {
// //   console.log("CRED_FILE environment variable not found.");
// // }

// // const data = {
// //   cred_file: Object.keys(parsedCredFile).length ? parsedCredFile : credFile,
// // };

// // const API_KEY = data.cred_file.firebase_api_key || "default_api_key"; // Optional default value

// // console.log("API Key:", API_KEY);

// // const API_KEY = Constants.expoConfig.extra.fireBaseApiKey;

// // export const signUp = async (email, password) => {
// //   try {
// //     const response = await axios.post(
// //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
// //         API_KEY,
// //       {
// //         email: email,
// //         password: password,
// //         returnSecureToken: true,
// //       }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     handleAxiosError("signUp", error);
// //     return error.response.data;
// //   }
// // };

// // export const login = async (email, password) => {
// //   console.log("API_KEY: ", API_KEY);
// //   try {
// //     const response = await axios.post(
// //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
// //         API_KEY,
// //       {
// //         email: email,
// //         password: password,
// //         returnSecureToken: true,
// //       }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     handleAxiosError("login", error);
// //     return error.response.data;
// //   }
// // };
