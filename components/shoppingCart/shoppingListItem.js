import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

import {
  addItemToShoppingList,
  removeItemFromShoppingList,
} from "../../http/shoppingListHttp";

import { AuthContext } from "../../store/auth-context";

const ShoppingListItem = ({ item, refreshList }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(item);

  const authCtx = useContext(AuthContext);

  const increaseItem = async (list, item) => {
    setLoading(true);
    const newData = await addItemToShoppingList(list, item);
    console.log("New Data:", newData);
    setData(newData || []);
    setLoading(false);
  };

  const removeItem = async (list, item) => {
    setLoading(true);
    const newData = await removeItemFromShoppingList(list, item);
    console.log("New Data:", newData);
    if (newData === null) {
        refreshList();
    }
    setData(newData || []);
    setLoading(false);
  };

  console.log("Init Data:", data);

  return (
    <>
      <View style={[styles.item, {}]}>
        <View>
          <Text>{data.item.name["heb"]}</Text>
        </View>
        {loading && <ActivityIndicator size="small" />}
        {!loading && (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                removeItem(authCtx.selectedList, { item: data.item._id });
              }}
            >
              <Text style={styles.mediumText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.mediumText}>{data.quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                increaseItem(authCtx.selectedList, { item: data.item._id });
              }}
            >
              <Text style={styles.mediumText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default ShoppingListItem;
