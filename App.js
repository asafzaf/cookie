import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./navigation/bottomTabNavigator";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AuthScreen from "./screens/beforeAuth/authScreen";

import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/rootNavigator";

const Gate = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {!authCtx.isLoggedIn && (
        <AuthScreen ctx_login={authCtx.login} ctx_signUp={authCtx.signup} />
      )}
      {authCtx.isLoggedIn && <RootNavigator />}
    </>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Gate />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
