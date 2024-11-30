import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { LanguageStringProvider } from "./store/language-context";
import AuthScreen from "./screens/beforeAuth/authScreen";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/rootNavigator";
// import Constants from "expo-constants";


const Gate = () => {
  const authCtx = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      {!authCtx.isLoggedIn && (
        <AuthScreen ctx_login={authCtx.login} ctx_signUp={authCtx.signup} />
      )}
      {authCtx.isLoggedIn && <RootNavigator />}
    </View>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <LanguageStringProvider>
          <Gate />
        </LanguageStringProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "DefaultFont",
    fontSize: 18,
  },
});
