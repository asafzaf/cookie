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

import ShoppingListItem from "../../components/shoppingCart/shoppingListItem";

import { getItems } from "../../http/itemHttp";
import {
  getShoppingListById,
  addItemToShoppingList,
  createAddUnrecognizedItemToShoppingList,
} from "../../http/shoppingListHttp";

const ShoppingCart = () => {
  const [AddItemsVisible, setAddItemsVisible] = useState(true);
  const [MyShoppingListVisible, setMyShoppingListVisible] = useState(true);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [unrecognizedShoppingListItems, setUnrecognizedShoppingListItems] =
    useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [listName, setListName] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setItemsLoading(true);
      setListLoading(true);

      let res = await getItems();
      setItems(res.data || []);

      setItemsLoading(false);
      if (authCtx.selectedList === null || authCtx.selectedList === undefined) {
        setListLoading(false);
        return;
      }

      let data = await getShoppingListById(authCtx.selectedList);

      setShoppingListItems(data.data.items || []);
      setUnrecognizedShoppingListItems(data.data.unrecognizedItems || []);
      setListName(data.data.name || "-No Name-");
      setListLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setListLoading(true);
      if (authCtx.selectedList === null || authCtx.selectedList === undefined) {
        setListLoading(false);
        return;
      }
      let data = await getShoppingListById(authCtx.selectedList);
      setShoppingListItems(data.data.items || []);
      setUnrecognizedShoppingListItems(data.data.unrecognizedItems || []);
      setListName(data.data.name || "-No Name-");

      setListLoading(false);
    }
    fetchData();
  }, [authCtx]);

  const filteredItems = items.filter((item) =>
    item.name["heb"].toLowerCase().includes(search.toLowerCase())
  );

  const addItem = async (list, item) => {
    setListLoading(true);
    await addItemToShoppingList(list, item);
    const newList = await getShoppingListById(authCtx.selectedList);
    setShoppingListItems(newList.data.items || []);
    setListLoading(false);
    setSearch("");
  };

  const addUnrecognizedItem = async (list, itemName) => {
    await createAddUnrecognizedItemToShoppingList(authCtx.mongoId, list, itemName);
    const newList = await getShoppingListById(authCtx.selectedList);
    setUnrecognizedShoppingListItems(newList.data.unrecognizedItems || []);
    setSearch("");
  };

  const refreshList = async () => {
    setListLoading(true);
    const newList = await getShoppingListById(authCtx.selectedList);
    setShoppingListItems(newList.data.items || []);
    setUnrecognizedShoppingListItems(newList.data.unrecognizedItems || []);
    setListLoading(false);
  };

  const toggleAddItems = () => {
    setAddItemsVisible(!AddItemsVisible);
  };

  const toggleMyShoppingList = () => {
    setMyShoppingListVisible(!MyShoppingListVisible);
  };

  const screenHeight = Dimensions.get("window").height;

  const addItemsHeight = MyShoppingListVisible
    ? screenHeight / 3
    : screenHeight / 1.7;
  const myShoppingListHeight = AddItemsVisible
    ? screenHeight / 3
    : screenHeight / 1.7;

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { alignSelf: "center" }]}>
        Shopping List: {listName}
      </Text>
      <View style={[styles.section, { maxHeight: addItemsHeight }]}>
        <TouchableOpacity
          style={styles.shoppingListTitle}
          onPress={toggleAddItems}
        >
          <Text style={styles.sectionTitle}>Add Items</Text>
        </TouchableOpacity>
        {AddItemsVisible && (
          <>
            <TextInput
              style={styles.searchBar}
              placeholder="Search items..."
              value={search}
              onChangeText={setSearch}
            />
            {itemsLoading && <ActivityIndicator size="large" />}
            {!itemsLoading && (
              <>
                {filteredItems.length === 0 ? (
                  <View style={styles.noMatchContainer}>
                    <Text style={styles.noMatchText}>
                      No matching items found
                    </Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() =>
                        addUnrecognizedItem(authCtx.selectedList, search)
                      }
                    >
                      <Text style={styles.addButtonText}>
                        Add "{search}" to the list
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
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
              </>
            )}
          </>
        )}
      </View>

      <View style={[styles.section, { maxHeight: myShoppingListHeight }]}>
        <TouchableOpacity
          style={styles.shoppingListTitle}
          onPress={toggleMyShoppingList}
        >
          <Text style={styles.sectionTitle}>My Shopping List</Text>
          <Text style={styles.counterTitle}>
            {[...shoppingListItems, ...unrecognizedShoppingListItems].length}{" "}
            items
          </Text>
        </TouchableOpacity>
        {MyShoppingListVisible && (
          <>
            {listLoading && <ActivityIndicator size="large" />}
            {!listLoading && (
              <FlatList
                data={[...shoppingListItems, ...unrecognizedShoppingListItems]}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ShoppingListItem item={item} refreshList={refreshList} />
                )}
                contentContainerStyle={styles.list}
              />
            )}
          </>
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
    marginTop: 4,
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
  shoppingListTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  counterTitle: {
    fontSize: 14,
  },
  noMatchContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  noMatchText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ShoppingCart;
