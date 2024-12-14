import React, { useState, useContext, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../store/auth-context";
import { LanguageStringContext } from "../store/language-context";

import HomeScreen from "../screens/homeTab/homeScreen";
import ShoppingLiveScreen from "../screens/homeTab/shoppingLiveScreen";

import MessagesModal from "../components/homeScreen/messageModal";
import CancelLiveShopModal from "../components/homeScreen/cancelLiveShopModal";
import AcceptLiveShopModal from "../components/homeScreen/acceptLiveShopModal";

import { getMessagesByUserId } from "../http/messageHttp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [cancelLiveShopModalVisible, setCancelLiveShopModalVisible] =
    useState(false);
  const [acceptLiveShopModalVisible, setAcceptLiveShopModalVisible] =
    useState(false);

  const popInMessages = () => {
    setMessageModalVisible(true);
  };

  const popInCancel = () => {
    setCancelLiveShopModalVisible(true);
  };

  const popInAccept = () => {
    setAcceptLiveShopModalVisible(true);
  };

  const navigation = useNavigation();

  const { translations } = useContext(LanguageStringContext);

  const options_translations = {
    yes: translations.general.yes,
    no: translations.general.no,
  };

  const message_translations = {
    messages_topic: translations.messages.topic,
    no_new_messages: translations.messages.no_new_messages,
    close: translations.general.close,
  };

  const cancel_live_shopping_translations = {
    cancel_shopping_title: translations.home_screen.cancel_shopping_title,
    cancel_shopping_message: translations.home_screen.cancel_shopping_message,
  };

  const complete_live_shopping_translations = {
    complete_shopping_title: translations.home_screen.complete_shopping_title,
    complete_shopping_message:
      translations.home_screen.complete_shopping_message,
    complete_shopping_total_price:
      translations.home_screen.complete_shopping_total_price,
  };

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authCtx.mongoId) {
          return;
        }
        const messagesData = await getMessagesByUserId(authCtx.token, authCtx.mongoId);
        if (messagesData) {
          setMessages(messagesData.data);
        } else {
          setMessages([]);
          console.log("No messages");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const removeMessage = (messageId) => {
    const newMessages = messages.filter((message) => message._id !== messageId);
    setMessages(newMessages);
  };

  const messageBox =
    messages.length > 0 ? (
      <TouchableOpacity onPressIn={popInMessages}>
        <MaterialCommunityIcons
          name="message-text-outline"
          size={27}
          color="red"
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPressIn={popInMessages}>
        <MaterialCommunityIcons
          name="message-text-outline"
          size={27}
          color="black"
        />
      </TouchableOpacity>
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
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPressIn={popInCancel}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <MaterialCommunityIcons
                  // name="hand-back-left-outline"
                  name="cancel"
                  size={26}
                />
                <Text style={{ fontSize: 16 }}>
                  {translations.general.cancel}
                </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPressIn={popInAccept}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ fontSize: 16 }}>
                  {translations.general.finish}
                </Text>
                <MaterialCommunityIcons name="check" size={27} color="black" />
              </TouchableOpacity>
            ),
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
      {messageModalVisible && (
        <MessagesModal
          visible={messageModalVisible}
          translations={message_translations}
          setModalVisible={setMessageModalVisible}
          messages={messages}
          removeMessage={removeMessage}
        />
      )}
      {cancelLiveShopModalVisible && (
        <CancelLiveShopModal
          visible={cancelLiveShopModalVisible}
          cancel_live_shopping_translations={cancel_live_shopping_translations}
          options_translations={options_translations}
          setModalVisible={setCancelLiveShopModalVisible}
          navigation={navigation}
        />
      )}
      {acceptLiveShopModalVisible && (
        <AcceptLiveShopModal
          visible={acceptLiveShopModalVisible}
          complete_live_shopping_translations={
            complete_live_shopping_translations
          }
          options_translations={options_translations}
          setModalVisible={setAcceptLiveShopModalVisible}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default HomeTabNavigator;
