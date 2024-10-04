import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./components/bottomTab/bottomTab";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AuthScreen from "./screens/authScreen";

import React from "react";
import { StatusBar } from "expo-status-bar";

const Gate = () => {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isLoggedIn && (
        <AuthScreen ctx_login={authCtx.login} ctx_signUp={authCtx.signup} />
      )}
      {authCtx.isLoggedIn && <BottomTab lang={authCtx.language} />}
      {/* <BottomTab /> */}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
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
