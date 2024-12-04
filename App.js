import { Alert, StyleSheet, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { LanguageStringProvider } from "./store/language-context";
import AuthScreen from "./screens/beforeAuth/authScreen";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/rootNavigator";
import { checkHealth } from "./http/generalHttp";
import LoadingScreen from "./components/general/loadingScreen";

import auth from "@react-native-firebase/auth";

const Gate = () => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);

  const authCtx = useContext(AuthContext);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (!initialized) {
      setInitialized(true);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const health = async () => {
      const response = await checkHealth();
      console.log("Health check response:", response);
      if (response) {
        console.log("Server is healthy");
      } else {
        Alert.alert(
          "Server is not healthy",
          `Please try again later:\n${process.env.EXPO_PUBLIC_API_URL}`
        );
      }
    };

    health();
  }, []);

  if (!initialized) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user && authCtx.isLoggedIn && <RootNavigator />}
      {!user && !authCtx.isLoggedIn && <AuthScreen ctx_login={authCtx.login} />}
      {user && !authCtx.isLoggedIn && <AuthScreen ctx_login={authCtx.login} />}
      {!user && authCtx.isLoggedIn && <AuthScreen ctx_login={authCtx.login} />}
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
