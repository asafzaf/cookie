import { getUserById } from "../http/userHttp";
import { getShoppingListById } from "../http/shoppingListHttp";

export const getShoppingListByUserId = async (userId) => {
  console.log("User ID (shopponglist): ", userId);
  const userData = await getUserById(userId);
  console.log("User Data:", userData);
  const listsIds = userData.data.shoppingLists;
  console.log("Lists IDs:", listsIds);
  const data = [];
  for (const listId of listsIds) {
    try {
      const res = await getShoppingListById(listId);
      data.push(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return data;
};