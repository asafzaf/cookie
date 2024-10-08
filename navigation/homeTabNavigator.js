import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/homeTab/homeScreen";

import MessagesModal from "../components/homeScreen/messageModal";

const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const messages = [];
  const messageBox =
    messages.length > 0 ? (
      <MaterialCommunityIcons
        name="message-text-outline"
        size={27}
        color="red"
        onPress={() => setMessageModalVisible(true)}
      />
    ) : (
      <MaterialCommunityIcons
        name="message-text-outline"
        size={27}
        color="black"
        onPress={() => setMessageModalVisible(true)}
      />
    );

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: ({ black, pressColor }) => messageBox,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      {messageModalVisible && (
        <MessagesModal
          visible={messageModalVisible}
          setModalVisible={setMessageModalVisible}
          messages={messages}
        />
      )}
    </>
  );
};

export default HomeTabNavigator;
