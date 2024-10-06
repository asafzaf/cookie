import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  mongoId: "",
  userId: "",
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  language: "en",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [mongoId, setMongoId] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();

  function login(token, mongoId, userId, userEmail, userFirstName, userLastName) {
    setAuthToken(token);
    setMongoId(mongoId);
    setUserId(userId);
    setUserEmail(userEmail);    
    setUserFirstName(userFirstName);
    setUserLastName(userLastName);
  }

  function logout() {
    setToken(null)
    setMongoId(null);
    setUserId(null);
    setUserEmail(null);
    setUserFirstName(null);
    setUserLastName(null);
  }

  

  const contextValue = {
    token: authToken,
    mongoId: mongoId,
    userId: userId,
    userEmail: userEmail,
    userFirstName: userFirstName,
    userLastName: userLastName,
    isLoggedIn: !!authToken,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;
