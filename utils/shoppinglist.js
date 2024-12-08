import { getUserById } from "../http/userHttp";
import { getShoppingListById } from "../http/shoppingListHttp";

export const getShoppingListByUserId = async (token, userId) => {
  const userData = await getUserById(userId);
  const listsIds = userData.data.shoppingLists;
  const data = [];
  for (const listId of listsIds) {
    try {
      const res = await getShoppingListById(token, listId);
      data.push(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return data;
};
