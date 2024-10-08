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
  removeItemFromShoppingList,
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
    await addItemToShoppingList(list, item);
    const newList = await getShoppingListById(authCtx.selectedList);
    setShoppingListItems(newList.data.items || []);
  };

  const addUnrecognizedItem = async (list, item) => {
    await addUnrecognizedItemToShoppingList(list, item);
    const newList = await getShoppingListById(authCtx.selectedList);
    setUnrecognizedShoppingListItems(newList.data.unrecognizedItems || []);
  };

  const refreshList = async () => {
    setListLoading(true);
    console.log("Refreshing list");
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
    : screenHeight / 2;
  const myShoppingListHeight = AddItemsVisible
    ? screenHeight / 3
    : screenHeight / 2;

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, {alignSelf:'center'}]}>Shopping List: {listName}</Text>
      <View style={[styles.section, { maxHeight: addItemsHeight }]}>
        <TouchableOpacity onPress={toggleAddItems}>
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
      </View>

      <View style={[styles.section, { maxHeight: myShoppingListHeight }]}>
        <TouchableOpacity onPress={toggleMyShoppingList}>
          <Text style={styles.sectionTitle}>My Shopping List</Text>
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
