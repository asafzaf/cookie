import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { setDefaultShoppingList } from "../../http/shoppingListHttp"; // Import new function
import { getShoppingListByUserId } from "../../utils/shoppinglist"; // Import existing function

import { Alert } from "react-native";

import { LanguageStringContext } from "../../store/language-context";

const ConfigureShoppingListsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const authCtx = useContext(AuthContext);
  const { translations } = useContext(LanguageStringContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!authCtx.userId) {
        setLoading(false);
        return;
      }
      const data = await getShoppingListByUserId(authCtx.userId);
      setShoppingLists(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredLists = shoppingLists.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase())
  );

  const screenHeight = Dimensions.get("window").height;

  const handleSetDefult = async (listId) => {
    // Set default shopping list
    setLoading(true);
    const newUserData = await setDefaultShoppingList({
      userId: authCtx.mongoId,
      listId,
    });
    if (newUserData) {
      await authCtx.refresh_user_data(newUserData);
    }
    Alert.alert("Success", "Default shopping list updated successfully");
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={[styles.section, { maxHeight: screenHeight / 3 }]}>
        <Text style={styles.sectionTitle}>{translations.settings_tab.avaliable_shopping_lists}</Text>
        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <FlatList
            data={filteredLists}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                disable={true}
                onPress={() =>
                  navigation.navigate("Shopping List Settings", {
                    listItemId: item._id,
                    userId: authCtx.mongoId,
                  })
                }
              >
                <View style={styles.item}>
                  <Text>{item.name}</Text>
                  {item._id !== authCtx.defaultShoppingList && (
                    <Pressable
                      onPress={() => {
                        handleSetDefult(item._id);
                      }}
                    >
                      <Text style={{ color: "blue" }}>{translations.settings_tab.set_as_default}</Text>
                    </Pressable>
                  )}
                  {item._id === authCtx.defaultShoppingList && (
                    <Text style={{ fontWeight: "bold" }}>{translations.settings_tab.default_shopping_list}</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      {/* Floating button in bottom-right corner */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("Create New List")} // Navigate to CreateListScreen
      >
        <Text style={styles.createButtonText}>+ {translations.settings_tab.create_shopping_list}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  // Style for the floating button
  createButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#888",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfigureShoppingListsScreen;
