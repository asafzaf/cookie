import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  mongoId: "",
  userId: "",
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  language: "en",
  defaultShoppingList: "",
  selectedList: "",
  userData: {},
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  change_list: (list) => {},
  refresh_user_data: (data) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [mongoId, setMongoId] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [defaultShoppingList, setDefaultShoppingList] = useState();
  const [selectedList, setSelectedList] = useState();
  const [userData, setUserData] = useState({});

  function login(
    token,
    mongoId,
    userId,
    userEmail,
    userFirstName,
    userLastName,
    defaultShoppingList,
    userData
  ) {
    setAuthToken(token);
    setMongoId(mongoId);
    setUserId(userId);
    setUserEmail(userEmail);
    setUserFirstName(userFirstName);
    setUserLastName(userLastName);
    setDefaultShoppingList(defaultShoppingList);
    setSelectedList(defaultShoppingList);
    setUserData(userData);
  }

  function logout() {
    setToken(null);
    setMongoId(null);
    setUserId(null);
    setUserEmail(null);
    setUserFirstName(null);
    setUserLastName(null);
    setDefaultShoppingList(null);
    setSelectedList(null);
    setUserData(null);
  }

  function change_list(list) {
    setSelectedList(list);
  }

  function refresh_user_data(data) {
    setUserData(data);
    setDefaultShoppingList(data.default_shopping_list);
  }

  const contextValue = {
    token: authToken,
    mongoId: mongoId,
    userId: userId,
    userEmail: userEmail,
    userFirstName: userFirstName,
    userLastName: userLastName,
    defaultShoppingList: defaultShoppingList,
    selectedList: selectedList,
    userData: userData,
    isLoggedIn: !!authToken,
    login,
    logout,
    change_list,
    refresh_user_data,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;
