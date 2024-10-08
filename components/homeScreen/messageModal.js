import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";

const MessagesModal = ({ visible, setModalVisible, messages }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Messages</Text>
          <View style={styles.messageList}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Text key={index} style={styles.messageText}>
                  {message}
                </Text>
              ))
            ) : (
              <Text style={styles.emptyMessage}>No messages available</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
