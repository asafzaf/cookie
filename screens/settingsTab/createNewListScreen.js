import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getUserById } from "../../http/userHttp";
import { createShoppingList } from "../../http/shoppingListHttp"; // Assuming you have a function for creating a list

const CreateListScreen = ({ navigation }) => {
  const [listName, setListName] = useState("");
  const authCtx = useContext(AuthContext);

  const handleCreateList = async () => {
    try {
      console.log("Creating list...");
      if (!listName) {
        Alert.alert("Please enter a list name");
        return;
      }
      const newList = await createShoppingList({
        userId: authCtx.mongoId,
        name: listName,
      }); // Create new list
      console.log("newList: ", newList);
      if (newList) {
        const userData = await getUserById(authCtx.userId); // Fetch user data
        authCtx.refresh_user_data(userData); // Refresh user data
        Alert.alert("List created successfully");
        navigation.goBack(); // Go back to the previous screen
      } else {
        Alert.alert("Failed to create list");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to create list");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
      />
      <Button title="Create List" onPress={handleCreateList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});

export default CreateListScreen;
