import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        const mongoId = await AsyncStorage.getItem("mongoId");
        setMongoId(mongoId);
        const userId = await AsyncStorage.getItem("userId");
        setUserId(userId);
        const userEmail = await AsyncStorage.getItem("userEmail");
        setUserEmail(userEmail);
        const language = await AsyncStorage.getItem("language");
        setLanguage(language);
        const userFirstName = await AsyncStorage.getItem("userFirstName");
        setUserFirstName(userFirstName);
        const userLastName = await AsyncStorage.getItem("userLastName");
        setUserLastName(userLastName);
        const defaultShoppingList = await AsyncStorage.getItem(
          "defaultShoppingList"
        );
        setDefaultShoppingList(defaultShoppingList);
        const userData = await AsyncStorage.getItem("userData");
        setUserData(JSON.parse(userData));
      }
    };

    fetchData();
  }, []);

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
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("mongoId", mongoId);
    AsyncStorage.setItem("userId", userId);
    AsyncStorage.setItem("userEmail", userEmail);
    AsyncStorage.setItem("language", language);
    AsyncStorage.setItem("userFirstName", userFirstName);
    AsyncStorage.setItem("userLastName", userLastName);
    AsyncStorage.setItem("defaultShoppingList", defaultShoppingList);
    AsyncStorage.setItem("userData", JSON.stringify(userData));
  }

  function logout() {
    setAuthToken(null);
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
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("mongoId");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userEmail");
    AsyncStorage.removeItem("language");
    AsyncStorage.removeItem("userFirstName");
    AsyncStorage.removeItem("userLastName");
    AsyncStorage.removeItem("defaultShoppingList");
    AsyncStorage.removeItem("userData");
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
