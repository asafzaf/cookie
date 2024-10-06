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
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  change_list: (list) => {},
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

  function login(token, mongoId, userId, userEmail, userFirstName, userLastName, defaultShoppingList) {
    setAuthToken(token);
    setMongoId(mongoId);
    setUserId(userId);
    setUserEmail(userEmail);    
    setUserFirstName(userFirstName);
    setUserLastName(userLastName);
    setDefaultShoppingList(defaultShoppingList);
    setSelectedList(defaultShoppingList);
  }

  function logout() {
    setToken(null)
    setMongoId(null);
    setUserId(null);
    setUserEmail(null);
    setUserFirstName(null);
    setUserLastName(null);
    setDefaultShoppingList(null);
    setSelectedList(null);
  }

  function change_list(list) {
    setSelectedList(list);
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
    isLoggedIn: !!authToken,
    login,
    logout,
    change_list,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;
