// import data from "./server.json";
import axios from "axios";
import { handleAxiosError } from "./axios.error";

const data = {
  serverUrl: process.env.EXPO_PUBLIC_API_URL,
}

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(data.serverUrl + "/api/v1/user/" + userId, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("getUserById", error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/user", user, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("ceateUser", error);
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(data.serverUrl + "/api/v1/user", user, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("updateUser", error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete(data.serverUrl + "/api/v1/user", {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("deleteUser", error);
  }
};

export const changeUserLanguage = async (userId, language) => {
  try {
    console.log("changeUserLanguage", userId, language);
    const response = await axios.put(data.serverUrl + "/api/v1/user/" + userId + "/language", { language }, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("changeLanguage", error);
  }
}