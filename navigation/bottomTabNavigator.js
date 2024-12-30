import React, { useState, useContext } from "react";
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

import { LanguageStringContext } from "../store/language-context";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const [modalVisible, setModalVisible] = useState(false);
  const { translations } = useContext(LanguageStringContext);

  const rootVars = translations.root;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "gray",
          tabBarLabelPosition: "below-icon",
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: "#f2f2f2",
            borderTopWidth: 0,
            padding: 5,
            height: "10%",
          },
          tabBarVisibilityAnimationConfig: {
            show: "slide-up",
            hide: "slide-down",
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home Tab"
          component={HomeTabNavigator}
          options={{
            tabBarLabelStyle: { fontSize: 14, marginBottom: 10 },
            tabBarLabel: rootVars.home,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              const state = navigation.getState();
              const currentRoute = state.routes[state.index]?.name;
              if (currentRoute === "Home Tab") {
                e.preventDefault();
              }
            },
          })}
        />
        <Tab.Screen
          name="Shopping Cart Tab"
          component={ShoppingCartTabNavigator}
          options={{
            tabBarLabelStyle: { fontSize: 14, marginBottom: 10 },
            tabBarLabel: rootVars.shopping_cart,
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
            tabBarLabelStyle: { fontSize: 14, marginBottom: 10 },
            tabBarLabel: rootVars.recipes,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="chef-hat"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings Tab"
          component={SettingsTabNavigator}
          options={{
            tabBarLabelStyle: { fontSize: 14, marginBottom: 10 },
            tabBarLabel: rootVars.settings,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <ProfileBox
        visible={modalVisible}
        setModalVisible={setModalVisible}
      ></ProfileBox>
    </>
  );
}
