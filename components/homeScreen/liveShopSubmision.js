import React from "react";
import { Alert } from "react-native";
import { updateLiveShoppingList } from "../../http/shoppingListHttp";

export const handleListSubmit = async (
  listId,
  userId,
  totalPrice,
  shoppingListDepartments
) => {
  console.log("List ID: ", listId);
  console.log("User ID: ", userId);
  console.log("Shopping List Departments: ", shoppingListDepartments);
  const res = await updateLiveShoppingList(listId, userId, totalPrice, shoppingListDepartments);
  console.log(res);
  if (res) {
    Alert.alert("הרשימה נשמרה בהצלחה");
  } else {
    Alert.alert("שגיאה בשמירת הרשימה");
  }
};
