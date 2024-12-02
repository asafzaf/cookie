import { Alert, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { LanguageStringProvider } from "./store/language-context";
import AuthScreen from "./screens/beforeAuth/authScreen";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/rootNavigator";
import { checkHealth } from "./http/generalHttp";

const Gate = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const health = async () => {
      const response = await checkHealth();
      console.log("Health check response:", response);
      if (response) {
        console.log("Server is healthy");
      } else {
        Alert.alert("Server is not healthy", `Please try again later:\n${process.env.EXPO_PUBLIC_API_URL}`,);
      }
    };

    health();
  }, []);

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
