import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SettingsScreen from "../screens/settingsTab/settingsScreen";
import ConfigureShoppingListsScreen from "../screens/settingsTab/configureShoppingListsScreen";
import CreateListScreen from "../screens/settingsTab/createNewListScreen";
import ShoppingListSettingsScreen from "../screens/settingsTab/shoppingListSettingsScreen";

import ProfileBox from "../components/bottomTab/profileBox";

const Stack = createNativeStackNavigator();

const SettingsTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: ({ black, pressColor }) => (
            <MaterialCommunityIcons
              name="account"
              size={27}
              color={black}
              pressColor={pressColor}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          ),
        }}
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen
          name="Configure Shopping Lists"
          component={ConfigureShoppingListsScreen}
        />
        <Stack.Screen name="Create New List" component={CreateListScreen} />
        <Stack.Screen name="Shopping List Settings" component={ShoppingListSettingsScreen} />
      </Stack.Navigator>
      <ProfileBox
        visible={modalVisible}
        setModalVisible={setModalVisible}
      ></ProfileBox>
    </>
  );
};

export default SettingsTabNavigator;
