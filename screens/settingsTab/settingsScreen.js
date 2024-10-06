import {
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    SafeAreaView,
  } from "react-native";
  import { StatusBar } from "expo-status-bar";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import React from "react";
  import { StyleSheet } from "react-native";
  import styles from "../../styles/styles";
  
  export default function SettingsScreen({ navigation }) {
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
          <Text style={ScreenStyles.buttonText}>Configure shopping lists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} title="My recipes" borderWidth="2">
          <Ionicons
            name="book-outline"
            size={ScreenStyles.icon.size}
            color={ScreenStyles.icon.color}
          />
          <Text style={ScreenStyles.buttonText}>My recipes</Text>
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
  