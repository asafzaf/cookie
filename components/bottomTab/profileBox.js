import React, { useContext } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../store/auth-context";

const ProfileBox = ({ visible, setModalVisible }) => {
  const authCtx = useContext(AuthContext);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeaderText}>Profile Information</Text>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://example.com/profile.jpg" }} // Replace with dynamic profile URL
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>First name: {authCtx.userFirstName}</Text>
            <Text style={styles.infoText}>Last name: {authCtx.userLastName}</Text>
            <Text style={styles.infoText}>Email: {authCtx.userEmail}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log("Edit Profile Pressed")} // Add your onPress functionality
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: '90%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileBox;
