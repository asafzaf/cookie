import { getUserById } from "../http/userHttp";
import { getShoppingListById } from "../http/shoppingListHttp";

export const getShoppingListByUserId = async (userId) => {
  const userData = await getUserById(userId);
  const listsIds = userData.data.shoppingLists;
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