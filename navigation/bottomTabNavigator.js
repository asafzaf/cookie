
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import HomeScreen from "../screens/homeTab/homeScreen";
// import ShoppingCart from "../screens/shoppingCartTab/shoppingCart";
// import RecipesIndexScreen from "../screens/recipesTab/recipesIndexScreen";
// import SettingsScreen from "../screens/settingsTab/settingsScreen";

import HomeTabNavigator from "./homeTabNavigator";
import ShoppingCartTabNavigator from "./shoppingCartTabNavigator";
import RecipesTabNavigator from "./recipesTabNavigator";
import SettingsTabNavigator from "./settingsTabNavigator";

import ProfileBox from "../components/bottomTab/profileBox";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          headerLeft: ({ tintColor,pressColor, }) => (
            <MaterialCommunityIcons name="account" size={30} color={tintColor} pressColor={pressColor} onPress={()=>{setModalVisible(true);}}/>
          ),
          tabBarVisibilityAnimationConfig: { show: "slide-up", hide: "slide-down" },
          headerShown: false,
        }}

      >
        <Tab.Screen
          name="Home Tab"
          component={HomeTabNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Shopping Cart Tab"
          component={ShoppingCartTabNavigator}
          options={{
            tabBarLabel: "Shopping Cart",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Recipes Tab"
          component={RecipesTabNavigator}
          options={{
            tabBarLabel: "Recipes",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chef-hat" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings Tab"
          component={SettingsTabNavigator}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <ProfileBox visible={modalVisible} setModalVisible={setModalVisible}></ProfileBox>
    </>
  );
}

