import data from "./server.json";
import axios from "axios";
import { handleAxiosError } from "./axios.error";

import { createUnrecognizedItem } from "./unrecognizedItemHttp";

export const getShoppingListById = async (listId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/shoppinglist/" + listId,
      {
        timeout: 5000,
        headers: {
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

export const getOrderedShoppingListById = async (listId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/ordered",
      {
        timeout: 5000,
        headers: {
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

export const createShoppingList = async (shoppingList) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist",
      shoppingList,
      {
        timeout: 5000,
        headers: {
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

export const addItemToShoppingList = async (listId, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/add",
      item,
      {
        timeout: 5000,
        headers: {
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
  userId,
  listId,
  itemName
) => {
  try {
    const obj = {
      name: itemName,
      createByUserId: userId,
      createOnList: listId,
    };
    const itemResponse = await createUnrecognizedItem(obj);
    const itemId = itemResponse._id;

    const res = addUnrecognizedItemToShoppingList(listId, { item: itemId });
    return res;
  } catch (error) {
    handleAxiosError("createAddUnrecognizedItemToShoppingList", error);
  }
};

export const addUnrecognizedItemToShoppingList = async (listId, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/addUnrecognized",
      item,
      {
        timeout: 5000,
        headers: {
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

export const removeItemFromShoppingList = async (listId, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/remove",
      item,
      {
        timeout: 5000,
        headers: {
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

export const removeUnrecognizedItemFromShoppingList = async (listId, item) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/" + listId + "/removeUnrecognized",
      item,
      {
        timeout: 5000,
        headers: {
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

export const setDefaultShoppingList = async ({ userId, listId }) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/setDefault",
      { userId, listId },
      {
        timeout: 5000,
        headers: {
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

export const addUserToShoppingList = async (listId, userEmail) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/addUser",
      { listId, userEmail },
      {
        timeout: 5000,
        headers: {
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

export const removeUserFromShoppingList = async (listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/removeUser",
      { listId, userId },
      {
        timeout: 5000,
        headers: {
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

export const addAdminToShoppingList = async (listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/addAdmin",
      { listId, userId },
      {
        timeout: 5000,
        headers: {
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

export const removeAdminFromShoppingList = async (listId, userId) => {
  try {
    const response = await axios.post(
      data.serverUrl + "/api/v1/shoppinglist/removeAdmin",
      { listId, userId },
      {
        timeout: 5000,
        headers: {
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
