import data from "./server.json";
import axios from "axios";
import { handleAxiosError } from "./axios.error";

export const getShoppingListById = async (listId) => {
  try {
    const response = await axios.get(data.serverUrl + "/api/v1/shoppinglist/" + listId, {
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

export const createShoppingList = async (shoppingList) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/shoppinglist", shoppingList, {
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

export const addItemToShoppingList = async (listId, item) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/shoppinglist/" + listId + "/add", item, {
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
}

export const removeItemFromShoppingList = async (listId, item) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/shoppinglist/" + listId + "/remove", item, {
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
}