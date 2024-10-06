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

import { getItems } from "../../http/itemHttp";
import {
  getShoppingListById,
  addItemToShoppingList,
  removeItemFromShoppingList,
} from "../../http/shoppingListHttp";

const ShoppingCart = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listName, setListName] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let res = await getItems();
      setItems(res.data || []);

      let data = await getShoppingListById(authCtx.selectedList);

      setShoppingList(data.data.items || []);
      setListName(data.data.name || "-No Name-");

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let data = await getShoppingListById(authCtx.selectedList);
      setShoppingList(data.data.items || []);
      setListName(data.data.name || "-No Name-");

      setLoading(false);
    }
    fetchData();
  }, [authCtx]);

  const filteredItems = items.filter((item) =>
    item.name["heb"].toLowerCase().includes(search.toLowerCase())
  );

  const addItem = async (list, item) => {
    addItemToShoppingList(list, item);
    const newList = await getShoppingListById(authCtx.selectedList);
    setShoppingList(newList.data.items || []);
  };

  const removeItem = async (list, item) => {
    removeItemFromShoppingList(list, item);
    const newList = await getShoppingListById(authCtx.selectedList);
    setShoppingList(newList.data.items || []);
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Shopping List: {listName}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={[styles.section, { maxHeight: screenHeight / 3 }]}>
        <Text style={styles.sectionTitle}>Available Items</Text>
        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  addItem(authCtx.selectedList, { item: item._id })
                }
              >
                <View style={styles.item}>
                  <Text>{item.name["heb"]}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Shopping List</Text>
        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <FlatList
            data={shoppingList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={[styles.item, {}]}>
                <View>
                  <Text>{item.item.name["heb"]}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      removeItem(authCtx.selectedList, { item: item.item._id });
                    }}
                  >
                    <Text style={styles.mediumText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.mediumText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      addItem(authCtx.selectedList, { item: item.item._id });
                    }}
                  >
                    <Text style={styles.mediumText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
  },
  item: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  mediumText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShoppingCart;
