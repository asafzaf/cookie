import axios from "axios";
import { handleAxiosError } from "./axios.error";

const data = {
  serverUrl: process.env.EXPO_PUBLIC_API_URL,
};

export const getMessageById = async (token, messageId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/message/" + messageId,
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
    handleAxiosError("getMessageById", error);
  }
};

export const getMessagesByUserId = async (token, userId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/message/user/" + userId,
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
    if (error.response.status === 404) {
      return null;
    }
    handleAxiosError("getMessagesByUserId", error);
  }
};

export const deleteMessage = async (token, messageId) => {
  try {
    await axios.delete(data.serverUrl + "/api/v1/message/" + messageId, {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleAxiosError("removeMessage", error);
  }
};
