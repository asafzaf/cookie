import axios from "axios";
import { handleAxiosError } from "./axios.error";

import { createUnrecognizedItem } from "./unrecognizedItemHttp";

const data = {
  serverUrl: process.env.EXPO_PUBLIC_API_URL,
};

export const getShoppingListById = async (token, listId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/shoppinglist/" + listId,
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
    handleAxiosError("getShoppingListById", error);
  }
};

export const getOrderedShoppingListById = async (token, listId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/ordered",
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
    handleAxiosError("getOrderedShoppingListById", error);
  }
};

export const createShoppingList = async (token, shoppingList) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist",
      shoppingList,
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
    handleAxiosError("createShoppingList", error);
  }
};

export const updateLiveShoppingList = async (
  token,
  listId,
  userId,
  totalPrice,
  departments
) => {
  try {
    const response = await axios.put(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/live",
      {
        departments: departments,
        userId: userId,
        totalPrice: totalPrice,
      },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const obj = JSON.parse(response.request._response);
    console.log("Update Live Shopping List Response", obj);
    return obj;
  } catch (error) {
    handleAxiosError("updateLiveShoppingList", error);
  }
};

export const addItemToShoppingList = async (token, listId, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/add",
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
    handleAxiosError("addItemToShoppingList", error);
  }
};

export const createAddUnrecognizedItemToShoppingList = async (
  token,
  userId,
  listId,
  itemName
) => {
  try {
    const obj = {
      name: itemName,
      createByUserId: userId,
      createOnList: [listId],
    };
    const itemResponse = await createUnrecognizedItem(token, obj);
    const itemId = itemResponse._id;
    const res = await addUnrecognizedItemToShoppingList(token, listId, {
      item: itemId,
    });
    return res;
  } catch (error) {
    handleAxiosError("createAddUnrecognizedItemToShoppingList", error);
  }
};

export const addUnrecognizedItemToShoppingList = async (
  token,
  listId,
  item
) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/addUnrecognized",
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
    handleAxiosError("addUnrecognizedItemToShoppingList", error);
  }
};

export const removeItemFromShoppingList = async (token, listId, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/remove",
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
    handleAxiosError("removeItemFromShoppingList", error);
  }
};

export const removeUnrecognizedItemFromShoppingList = async (
  token,
  listId,
  item
) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/removeUnrecognized",
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
    handleAxiosError("removeUnrecognizedItemFromShoppingList", error);
  }
};

export const setDefaultShoppingList = async (token, { userId, listId }) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/setDefault",
      { userId, listId },
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
    handleAxiosError("setDefaultShoppingList", error);
  }
};

export const addUserToShoppingList = async (
  token,
  selfId,
  listId,
  userEmail
) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/addUser",
      { selfId, listId, userEmail },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const obj = JSON.parse(response.request._response);
    console.log("Add User Response", obj);
    return obj;
  } catch (error) {
    handleAxiosError("addUserToShoppingList", error);
  }
};

export const acceptUserToShoppingList = async (token, listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/acceptUser",
      { listId, userId },
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
    handleAxiosError("acceptUserToShoppingList", error);
  }
};

export const rejectUserToShoppingList = async (token, listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/rejectUser",
      { listId, userId },
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
    handleAxiosError("rejectUserToShoppingList", error);
  }
};

export const removeUserFromShoppingList = async (token, listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/removeUser",
      { listId, userId },
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
    handleAxiosError("removeUserFromShoppingList", error);
  }
};

export const addAdminToShoppingList = async (token, listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/addAdmin",
      { listId, userId },
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
    handleAxiosError("addAdminToShoppingList", error);
  }
};

export const removeAdminFromShoppingList = async (token, listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/removeAdmin",
      { listId, userId },
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
    handleAxiosError("removeAdminFromShoppingList", error);
  }
};
