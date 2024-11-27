import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { LanguageStringProvider } from "./store/language-context";
import AuthScreen from "./screens/beforeAuth/authScreen";

import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/rootNavigator";

// import * as Font from "expo-font";

// const loadFonts = () => {
//   return Font.loadAsync({
//     defaulFont: require("./assets/fonts/RobotoRegular.ttf"),
//   });
// };

const Gate = () => {
  const authCtx = useContext(AuthContext);

  

  return (
    // <>
    <View style={{ flex: 1 }}>
      {/* {!authCtx.isLoggedIn && (
        <AuthScreen ctx_login={authCtx.login} ctx_signUp={authCtx.signup} />
      )}
      {authCtx.isLoggedIn && <RootNavigator />} */}
      <RootNavigator />
    </View>
    // </>
  );
};

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchFonts = async () => {
  //     await loadFonts();
  //     setFontsLoaded(true);
  //   };

  //   fetchFonts();
  // }, []);

  // if (!fontsLoaded) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

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
