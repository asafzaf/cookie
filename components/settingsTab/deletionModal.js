import React, { useContext } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

import { AuthContext } from "../../store/auth-context";

const DeletionModal = ({
  visible,
  setModalVisible,
  userEmail,
  userId,
  RemoveUser,
}) => {
  const authCtx = useContext(AuthContext);

  const handleDeletion = async () => {
    await RemoveUser(userId);
    setModalVisible(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Are you sure you want remove user?</Text>
          <Text style={styles.subTitle}>{userEmail}</Text>
          <View style={styles.buttonContainer}>
            <Button title="No" onPress={() => setModalVisible(false)} />
            <Button color="#FF2929" title="Yes" onPress={handleDeletion} />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DeletionModal;
