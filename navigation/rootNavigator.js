import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./bottomTabNavigator";
import BottomAd from "../components/ads/bottomAd";

const RootNavigator = () => {
  return (
      <NavigationContainer>
        <BottomTab />
        <BottomAd />
      </NavigationContainer>
  );
};

export default RootNavigator;
