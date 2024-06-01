import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./components/bottomTab/bottomTab";

import React from "react";


export default function App() {
  return (
    <NavigationContainer>
      <BottomTab />
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
