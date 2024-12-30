import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { InvitationMessageComponent } from "./messages/messagesComponents";

const MessagesModal = ({
  visible,
  setModalVisible,
  messages,
  translations,
  removeMessage,
}) => {
  const { messages_topic, no_new_messages, close } = translations;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{messages_topic}</Text>
          <View style={styles.messageList}>
            {messages.length > 0 ? (
              <ScrollView style={styles.scrollView}>
                {messages.map((message) =>
                  message.type === "invitation" ? (
                    <InvitationMessageComponent
                      key={message._id}
                      id={message._id}
                      title={message.title}
                      userId={message.userId}
                      message={message.message}
                      attachments={message.attachments}
                      removeMessage={removeMessage}
                    />
                  ) : null
                )}
              </ScrollView>
            ) : (
              <Text style={styles.emptyMessage}>{no_new_messages}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>{close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageList: {
    maxHeight: 200, // Constrain the height if there are many messages
    marginBottom: 20,
    width: "100%",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#888",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MessagesModal;
