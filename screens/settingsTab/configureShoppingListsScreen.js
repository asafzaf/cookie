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
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getShoppingListByUserId } from "../../utils/shoppinglist"; // Import existing function

const ConfigureShoppingListsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const authCtx = useContext(AuthContext);

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={[styles.section, { maxHeight: screenHeight / 3 }]}>
        <Text style={styles.sectionTitle}>Available Lists</Text>
        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <FlatList
            data={filteredLists}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.item}>
                  <Text>{item.name}</Text>
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
        <Text style={styles.createButtonText}>+ Create New List</Text>
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
    backgroundColor: "#007BFF",
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
