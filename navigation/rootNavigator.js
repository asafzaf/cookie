import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./bottomTabNavigator";

const RootNavigator = () => {
  return (
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
  );
};

export default RootNavigator;
