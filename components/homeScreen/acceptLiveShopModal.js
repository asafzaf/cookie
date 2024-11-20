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

const AcceptLiveShopModal = ({
  visible,
  setModalVisible,
  navigation,
  complete_live_shopping_translations,
  options_translations,
}) => {
  const authCtx = useContext(AuthContext);
  const listId = authCtx.selectedList;
  const userId = authCtx.mongoId;
  const shoppingListDepartments = authCtx.checkedList;
  const [totalPrice, setTotalPrice] = useState(0);

  const translations = complete_live_shopping_translations;

  const options = options_translations;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {translations.complete_shopping_title}
          </Text>
          <Text style={styles.messageText}>
            {translations.complete_shopping_message}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>{options.no}</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text>{translations.complete_shopping_total_price}:</Text>
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
              <Text style={styles.buttonText}>{options.yes}</Text>
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
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    alignSelf: "center",
    textAlign: "center",
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
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
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
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: 100,
    marginLeft: 10,
  },
});

export default AcceptLiveShopModal;
