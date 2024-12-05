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

export const resetPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    handleAxiosError("resetPassword", error);
    return error;
  }
};
