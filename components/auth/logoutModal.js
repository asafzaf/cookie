import React, { useContext } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

import { logOut } from "../../services/auth";

import { AuthContext } from "../../store/auth-context";

const LogoutModal = ({ visible, setModalVisible }) => {
  const authCtx = useContext(AuthContext);

  const handleLoguot = async () => {
    try {
      authCtx.logout();
      await logOut();
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Are you sure you want to log out?</Text>
          <View style={styles.buttonContainer}>
            <Button title="No" onPress={() => setModalVisible(false)} />
            <Button color="#FF2929" title="Yes" onPress={handleLoguot} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
