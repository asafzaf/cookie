import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SettingsScreen from "../screens/settingsTab/settingsScreen";
import ConfigureShoppingListsScreen from "../screens/settingsTab/configureShoppingListsScreen";
import CreateListScreen from "../screens/settingsTab/createNewListScreen";
import ShoppingListSettingsScreen from "../screens/settingsTab/shoppingListSettingsScreen";

import ProfileBox from "../components/bottomTab/profileBox";
import LogoutModal from "../components/auth/logoutModal";

import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

const SettingsTabNavigator = () => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const popUpProfile = () => {
    setProfileModalVisible(true);
  };

  const popUpLogout = () => {
    setLogoutModalVisible(true);
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: ({ black, pressColor }) => (
            <TouchableOpacity onPressIn={popUpProfile}>
              <MaterialCommunityIcons
                name="account"
                size={27}
                color={black}
                pressColor={pressColor}
              />
            </TouchableOpacity>
          ),
          // headerLeft: ({ black, pressColor }) => (
          //   <TouchableOpacity onPressIn={popUpLogout}>
          //     <MaterialCommunityIcons
          //       name="logout"
          //       size={27}
          //       color={black}
          //       pressColor={pressColor}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen
          name="Configure Shopping Lists"
          component={ConfigureShoppingListsScreen}
          options={{ headerRight: null }}
        />
        <Stack.Screen
          name="Create New List"
          component={CreateListScreen}
          options={{ headerRight: null }}
        />
        <Stack.Screen
          name="Shopping List Settings"
          component={ShoppingListSettingsScreen}
          options={{ headerRight: null }}
        />
      </Stack.Navigator>
      <ProfileBox
        visible={profileModalVisible}
        setModalVisible={setProfileModalVisible}
      ></ProfileBox>
      {/* <LogoutModal
        visible={logoutModalVisible}
        setModalVisible={setLogoutModalVisible}
      ></LogoutModal> */}
    </>
  );
};

export default SettingsTabNavigator;
