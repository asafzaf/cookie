import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",
  userFirstName: "",
  userLastName: "",
  language: "en",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();

  function login(token, userId, userEmail, userFirstName, userLastName) {
    setAuthToken(token);
    setUserId(userId);
    setUserEmail(userEmail);    
    setUserFirstName(userFirstName);
    setUserLastName(userLastName);
  }

  function logout() {
    setToken(null)
    setUserId(null);
    setUserEmail(null);
    setUserFirstName(null);
    setUserLastName(null);
  }

  

  const contextValue = {
    token: authToken,
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
