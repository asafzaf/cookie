import axios from "axios";
import { handleAxiosError } from "./axios.error";

const data = {
  serverUrl: process.env.EXPO_PUBLIC_API_URL,
};

export const createUnrecognizedItem = async (token, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/unrecognizedItem",
      item,
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("createUnrecognizedItem", error);
  }
};
