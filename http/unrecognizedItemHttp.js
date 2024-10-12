import data from "./server.json";
import axios from "axios";
import { handleAxiosError } from "./axios.error";

export const createUnrecognizedItem = async (item) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/unrecognizedItem", item, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("createUnrecognizedItem", error);
  }
};
