import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import styles from "../../styles/styles";
import RenderRecipesList from "../../models/recipe.model";

import { LanguageStringContext } from "../../store/language-context";

import ComingSoonComponent from "../../components/general/commingSoonComponent";

export default function RecipesIndexScreen() {
  const { translations } = useContext(LanguageStringContext);

  return (
    <View style={styles.container}>
      <ComingSoonComponent />
      <Text style={ScreenStyles.topic}>Let's look for new recipes!</Text>
      {/* <TouchableOpacity
        style={styles.recipeItem}
        title="Let's start Shopping!"
        borderWidth="2"
      >
          <Text style={ScreenStyles.buttonText}>Pasta with tomato sauce</Text>
        <View style={styles.recipeItemInner}>
          <View style={{ width: "35%", marginLeft: 25 }}>
            <Text style={styles.text.size.small}>Time: 30 min</Text>
            <Text style={styles.text.size.small}>Difficulty: Easy</Text>
            <Text style={styles.text.size.small}>Ingredients: 5</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={styles.text.size.small}>Category: Pasta</Text>
            <Text style={styles.text.size.small}>By: asafz</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Image
              source={require("../assets/pasta.jpg")}
              style={styles.recipeImageItem}
            />
          </View>
        </View>
      </TouchableOpacity> */}
      <RenderRecipesList />
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
