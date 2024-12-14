import axios from "axios";
import { handleAxiosError } from "./axios.error";

const data = {
  serverUrl: process.env.EXPO_PUBLIC_API_URL,
};

export const getItems = async (token) => {
  try {
    const response = await axios.get(data.serverUrl + "/api/v1/item", {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("getItems", error);
  }
};
