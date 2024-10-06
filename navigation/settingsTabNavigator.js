import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/settingsTab/settingsScreen";
import ConfigureShoppingListsScreen from "../screens/settingsTab/configureShoppingListsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileBox from "../components/bottomTab/profileBox";

const Stack = createNativeStackNavigator();

const SettingsTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: ({ tintColor, pressColor }) => (
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={tintColor}
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
      </Stack.Navigator>
      <ProfileBox
        visible={modalVisible}
        setModalVisible={setModalVisible}
      ></ProfileBox>
    </>
  );
};

export default SettingsTabNavigator;
