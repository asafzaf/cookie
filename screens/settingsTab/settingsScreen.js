import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import styles from "../../styles/styles";

import { LanguageStringContext } from "../../store/language-context";

import ComingSoonComponent from "../../components/general/commingSoonComponent";

export default function SettingsScreen({ navigation }) {
  
  const { translations } = useContext(LanguageStringContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        title="Let's start Shopping!"
        borderWidth="2"
        onPress={() => navigation.navigate("Configure Shopping Lists")}
      >
        <Ionicons
          name="cart-outline"
          size={ScreenStyles.icon.size}
          color={ScreenStyles.icon.color}
        />
        <Text style={ScreenStyles.buttonText}>{translations.settings_tab.configure_shopping_lists}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} title="My recipes" borderWidth="2">
        <ComingSoonComponent /> 
        <Ionicons
          name="book-outline"
          size={ScreenStyles.icon.size}
          color={ScreenStyles.icon.color}
        />
        <Text style={ScreenStyles.buttonText}>{translations.settings_tab.settings_configure_recipes}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const ScreenStyles = StyleSheet.create({
  topic: {
    fontSize: styles.text.size.large,
    fontWeight: "bold",
    color: styles.colors.black,
    marginBottom: 20,
    alignSelf: "baseline",
  },
  buttonText: {
    fontSize: styles.text.size.medium,
    color: styles.colors.primary,
  },
  icon: {
    size: 32,
    color: styles.colors.primary,
  },
});
