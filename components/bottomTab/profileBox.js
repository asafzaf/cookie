import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { changeUserLanguage } from "../../http/userHttp";

import { LanguageStringContext } from "../../store/language-context";

const ProfileBox = ({ visible, setModalVisible }) => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { translations, changeLanguage } = useContext(LanguageStringContext);

  const setLanguage = async (language) => {
    try {
      setIsLoading(true);
      const newUserData = await changeUserLanguage(authCtx.mongoId,language);
      changeLanguage(newUserData.language);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeaderText}>
            {translations.profile.topic}
          </Text>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://example.com/profile.jpg" }} // Replace with dynamic profile URL
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {translations.profile.first_name}: {authCtx.userFirstName}
            </Text>
            <Text style={styles.infoText}>
              {translations.profile.last_name}: {authCtx.userLastName}
            </Text>
            <Text style={styles.infoText}>
              {translations.profile.email}: {authCtx.userEmail}
            </Text>
            <Text style={styles.infoText}>
              {translations.profile.change_language_title}:
            </Text>
            <View style={styles.languageContainer}>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setLanguage("english")} // Add your onPress functionality
              >
                <Image
                  style={styles.languageIcon}
                  source={require("../../assets/images/countries/united-states.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setLanguage("hebrew")} // Add your onPress functionality
              >
                <Image
                  style={styles.languageIcon}
                  source={require("../../assets/images/countries/israel.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log("Edit Profile Pressed")} // Add your onPress functionality
          >
            <Text style={styles.editButtonText}>
              {translations.profile.edit_profile}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>
              {translations.general.close}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
    width: "90%",
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
  languageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  languageIcon: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  languageButton: {
    padding: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ProfileBox;
