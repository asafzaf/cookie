import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";

import HomeScreen from "../screens/homeTab/homeScreen";

import ShoppingLiveScreen from "../screens/homeTab/shoppingLiveScreen";

import MessagesModal from "../components/homeScreen/messageModal";
import CancelLiveShopModal from "../components/homeScreen/cancelLiveShopModal";

const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [cancelLiveShopModalVisible, setCancelLiveShopModalVisible] =
    useState(false);
  const [acceptLiveShopModalVisible, setAcceptLiveShopModalVisible] =
    useState(false);

  const navigation = useNavigation();

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
        <Stack.Screen
          name="Live Shopping"
          component={ShoppingLiveScreen}
          options={{
            headerLeft: () => (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  setCancelLiveShopModalVisible(true);
                }}
              >
                <MaterialCommunityIcons
                  // name="hand-back-left-outline"
                  name="cancel"
                  size={26}
                />
                ,<Text style={{ fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  setCancelLiveShopModalVisible(true);
                }}
              >
                <Text style={{fontSize: 16}}>Accept</Text>
                <MaterialCommunityIcons
                  name="check"
                  size={27}
                  color="black"
                  onPress={() => setMessageModalVisible(true)}
                />
              </TouchableOpacity>
            ),
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
      {messageModalVisible && (
        <MessagesModal
          visible={messageModalVisible}
          setModalVisible={setMessageModalVisible}
          messages={messages}
        />
      )}
      {cancelLiveShopModalVisible && (
        <CancelLiveShopModal
          visible={cancelLiveShopModalVisible}
          setModalVisible={setCancelLiveShopModalVisible}
          navigation={navigation}
        />
      )}
      {acceptLiveShopModalVisible && (
        <AcceptLiveShopModal
          visible={acceptLiveShopModalVisible}
          setModalVisible={setAcceptLiveShopModalVisible}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default HomeTabNavigator;
