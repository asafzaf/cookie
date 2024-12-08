import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AuthContext } from "../../store/auth-context";

import ShoppingListItem from "../../components/shoppingCart/shoppingListItem";

import { getItems } from "../../http/itemHttp";
import {
  getShoppingListById,
  addItemToShoppingList,
  createAddUnrecognizedItemToShoppingList,
} from "../../http/shoppingListHttp";
import ModalMessage from "../../components/general/modalMessage";
import { LanguageStringContext } from "../../store/language-context";

const ShoppingCart = () => {
  const [refreshing, setRefreshing] = useState(false);
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
  const [openNoListModal, setOpenNoListModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const { translations } = useContext(LanguageStringContext);

  const language = translations.language;

  const vars = {
    add: translations.general.add,
    to_the_shopping_list: translations.general.to_the_shopping_list,
  };

  const onPefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setItemsLoading(true);
      setListLoading(true);

      let res = await getItems(authCtx.token);
      setItems(res.data || []);

      setItemsLoading(false);
      if (authCtx.selectedList === null || authCtx.selectedList === undefined) {
        setOpenNoListModal(true);
        setListLoading(false);
        return;
      }

      let data = await getShoppingListById(authCtx.token, authCtx.selectedList);

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
      let data = await getShoppingListById(authCtx.token, authCtx.selectedList);
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
    await addItemToShoppingList(authCtx.token, list, item);
    const newList = await getShoppingListById(
      authCtx.token,
      authCtx.selectedList
    );
    setShoppingListItems(newList.data.items || []);
    setListLoading(false);
    setSearch("");
  };

  const addUnrecognizedItem = async (list, itemName) => {
    await createAddUnrecognizedItemToShoppingList(
      authCtx.token,
      authCtx.mongoId,
      list,
      itemName
    );
    const newList = await getShoppingListById(
      authCtx.token,
      authCtx.selectedList
    );
    setUnrecognizedShoppingListItems(newList.data.unrecognizedItems || []);
    setSearch("");
  };

  const refreshList = async () => {
    setListLoading(true);
    const newList = await getShoppingListById(
      authCtx.token,
      authCtx.selectedList
    );
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
        {translations.shopping_list.title}: {listName}
      </Text>
      <View style={[styles.section, { maxHeight: addItemsHeight }]}>
        <TouchableOpacity
          style={styles.shoppingListTitle}
          onPress={toggleAddItems}
        >
          <Text style={styles.sectionTitle}>
            {translations.shopping_list.add_items}
          </Text>
        </TouchableOpacity>
        {AddItemsVisible && (
          <>
            <TextInput
              style={styles.searchBar}
              // autoFocus={true}
              placeholder={translations.shopping_list.search_items}
              value={search}
              onChangeText={setSearch}
            />
            {itemsLoading && <ActivityIndicator size="large" />}
            {!itemsLoading && (
              <>
                {filteredItems.length === 0 ? (
                  <View style={styles.noMatchContainer}>
                    <Text style={styles.noMatchText}>
                      {translations.shopping_list.items_not_found}
                    </Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() =>
                        addUnrecognizedItem(authCtx.selectedList, search)
                      }
                    >
                      <Text style={styles.addButtonText}>
                        {vars.add} "{search}" {vars.to_the_shopping_list}
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
                          <Text>{item.name[language]}</Text>
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
          <Text style={styles.sectionTitle}>
            {translations.shopping_list.my_shopping_list}
          </Text>
          <Text style={styles.counterTitle}>
            {[...shoppingListItems, ...unrecognizedShoppingListItems].length}{" "}
            {translations.shopping_list.items}
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
                  <ShoppingListItem
                    item={item}
                    refreshList={refreshList}
                    language={language}
                  />
                )}
                contentContainerStyle={styles.list}
              />
            )}
          </>
        )}
      </View>
      {openNoListModal && (
        <ModalMessage
          show={openNoListModal}
          handleClose={() => setOpenNoListModal(false)}
          title="No List Selected"
          message="Please select a shopping list from the home screen."
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 50,
    fontSize: 18,
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
