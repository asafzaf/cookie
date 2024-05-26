import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./bottomTab/bottomTab";

import React from "react";


export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
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
