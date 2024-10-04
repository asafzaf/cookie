
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../../screens/homeScreen";
import ShoppingCart from "../../screens/shoppingCart";
import RecipesIndexScreen from "../../screens/recipesIndexScreen";
import ProfileBox from "./profileBox";

const Tab = createBottomTabNavigator();

export default function BottomTab({lang}) {
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
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Shopping Cart"
          component={ShoppingCart}
          initialParams={language=lang}
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
          name="Recipes"
          component={RecipesIndexScreen}
          options={{
            tabBarLabel: "Recipes",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chef-hat" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={HomeScreen}
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

