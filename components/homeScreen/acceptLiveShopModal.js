import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { AuthContext } from "../../store/auth-context";

import { handleListSubmit } from "../homeScreen/liveShopSubmision";

const AcceptLiveShopModal = ({ visible, setModalVisible, navigation }) => {
  const authCtx = useContext(AuthContext);
  const listId = authCtx.selectedList;
  const userId = authCtx.mongoId;
  const shoppingListDepartments = authCtx.checkedList;
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Complete Live Shopping</Text>
          <Text style={styles.messageText}>
            Are you sure you want to complete the live shopping session?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text>Total Price:</Text>
              <TextInput
                onChangeText={(text) => setTotalPrice(text)}
                value={totalPrice}
                inputMode="decimal"
                style={styles.priceInput}
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={async () => {
                await handleListSubmit(
                  listId,
                  userId,
                  totalPrice,
                  shoppingListDepartments
                );
                setModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: 100,
    marginLeft: 10,
  },
});

export default AcceptLiveShopModal;
