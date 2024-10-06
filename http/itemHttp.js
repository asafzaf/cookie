import data from "./server.json";
import axios from "axios";
import { handleAxiosError } from "./axios.error";

export const getItems = async () => {
  try {
    const response = await axios.get(data.serverUrl + "/api/v1/item", {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError(error);
  }
};
