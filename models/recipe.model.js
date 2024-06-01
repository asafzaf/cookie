import DummyRecipes from "../data/dummyRecipes";
import styles from "../styles/styles";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { StyleSheet } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import { Text, View, Image } from "react-native";


const RenderRecipesList = () => {
  return (
    <FlatList
      style={{ width: "100%", height: "100%" }}
      data={DummyRecipes.recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          style={styles.recipeItem}
          title="Let's start Shopping!"
          borderWidth="2"
        >
          <Text style={ScreenStyles.buttonText}>{item.title}</Text>
          <View style={styles.recipeItemInner}>
            <View style={{ width: "35%", marginLeft: 25 }}>
              <Text style={styles.text.size.small}>Time: {item.time}</Text>
              <Text style={styles.text.size.small}>
                Difficulty: {item.difficulty}
              </Text>
              <Text style={styles.text.size.small}>
                Ingredients: {item.ingredients.length}
              </Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text style={styles.text.size.small}>
                Category: {item.category}
              </Text>
              <Text style={styles.text.size.small}>By: {item.author}</Text>
            </View>
            <View style={{ width: "33%" }}>
              <Image
                source={require("../assets/images/pasta.jpg")}
                style={styles.recipeImageItem}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

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
  
export default RenderRecipesList;
