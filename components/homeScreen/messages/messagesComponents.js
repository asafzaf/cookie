import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";

import {
  acceptUserToShoppingList,
  rejectUserToShoppingList,
} from "../../../http/shoppingListHttp";

import { deleteMessage } from "../../../http/messageHttp";

import { LanguageStringContext } from "../../../store/language-context";

export const InvitationMessageComponent = (props) => {
  const { id, title, message, attachments, userId, removeMessage } = props;
  const [hasClicked, setHasClicked] = useState(false);

  const { translations } = useContext(LanguageStringContext);
  const { confirm, cancel, processing } = translations.general;

  let listId = attachments[0];
  if (listId.startsWith("listId: ")) {
    listId = listId.substring(8);
  }

  const handleAccept = async () => {
    try {
      await acceptUserToShoppingList(listId, userId);
      await deleteMessage(id);
      setHasClicked(true);
      setTimeout(() => {
        removeMessage(id);
      }, 3000);
    } catch (error) {
      console.log("Error accepting user to shopping list:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectUserToShoppingList(listId, userId);
      await deleteMessage(id);
      console.log("Rejected user from shopping list");
      setHasClicked(true);
      setTimeout(() => {
        removeMessage(id);
      }, 3000);
    } catch (error) {
      console.log("Error rejecting user from shopping list:", error);
    }
  };

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageTitle}>{title}</Text>
      <Text style={styles.messageText}>{message}</Text>
      {hasClicked && <Text>{processing}</Text>}
      {!hasClicked && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text>{confirm}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleReject}>
            <Text>{cancel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 8,
    margin: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  messageTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 8,
  },
  acceptButton: {
    backgroundColor: "lightgreen",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "lightcoral",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});
