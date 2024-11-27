import axios from "axios";
import { handleAxiosError } from "../http/axios.error";

const cred_file = process.env.CRED_FILE ?? require("../config/creds.json");

const API_KEY = cred_file.firebase_api_key;

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError("signUp", error);
    return error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError("login", error);
    return error.response.data;
  }
};
