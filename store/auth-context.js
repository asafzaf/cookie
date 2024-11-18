import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  mongoId: "",
  userId: "",
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  language: "",
  defaultShoppingList: "",
  selectedList: "",
  userData: {},
  isLoggedIn: false,
  checkedList: [],
  login: (token) => {},
  logout: () => {},
  change_list: (list) => {},
  refresh_user_data: (data) => {},
  updateCheckedList: (departments) => {},
  updateLanguage: (lang) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [mongoId, setMongoId] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [language, setLanguage] = useState("english");
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [defaultShoppingList, setDefaultShoppingList] = useState();
  const [selectedList, setSelectedList] = useState();
  const [userData, setUserData] = useState({});
  const [checkedList, setCheckedList] = useState([]);

  function login(
    token,
    mongoId,
    userId,
    userEmail,
    language,
    userFirstName,
    userLastName,
    defaultShoppingList,
    userData
  ) {
    setAuthToken(token);
    setMongoId(mongoId);
    setUserId(userId);
    setUserEmail(userEmail);
    setLanguage(language);
    setUserFirstName(userFirstName);
    setUserLastName(userLastName);
    setDefaultShoppingList(defaultShoppingList);
    setSelectedList(defaultShoppingList);
    setUserData(userData);
    setCheckedList([]);
  }

  function logout() {
    setToken(null);
    setMongoId(null);
    setUserId(null);
    setUserEmail(null);
    setLanguage(null);
    setUserFirstName(null);
    setUserLastName(null);
    setDefaultShoppingList(null);
    setSelectedList(null);
    setUserData(null);
    setCheckedList([]);
  }

  function change_list(list) {
    setSelectedList(list);
  }

  function refresh_user_data(data) {
    setUserData(data);
    setDefaultShoppingList(data.default_shopping_list);
  }

  function updateCheckedList(departments) {
    setCheckedList(departments);
  }

  function updateLanguage(lang) {
    setLanguage(lang);
  }

  const contextValue = {
    token: authToken,
    mongoId: mongoId,
    userId: userId,
    userEmail: userEmail,
    language: language,
    userFirstName: userFirstName,
    userLastName: userLastName,
    defaultShoppingList: defaultShoppingList,
    selectedList: selectedList,
    userData: userData,
    isLoggedIn: !!authToken,
    checkedList: checkedList,
    login,
    logout,
    change_list,
    refresh_user_data,
    updateCheckedList,
    updateLanguage,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;
