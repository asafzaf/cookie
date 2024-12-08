import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  addItemToShoppingList,
  addUnrecognizedItemToShoppingList,
  removeItemFromShoppingList,
  removeUnrecognizedItemFromShoppingList,
} from "../../http/shoppingListHttp";

import { AuthContext } from "../../store/auth-context";

const ShoppingListItem = ({ item, refreshList, language }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(item);

  const authCtx = useContext(AuthContext);

  const increaseItem = async (list, item) => {
    setLoading(true);
    let newData = null;
    if (data.item.numberOfTimesRecognized !== undefined) {
      newData = await addUnrecognizedItemToShoppingList(
        authCtx.token,
        list,
        item
      );
    } else {
      newData = await addItemToShoppingList(authCtx.token, list, item);
    }
    setData(newData || []);
    setLoading(false);
  };

  const removeItem = async (list, item) => {
    setLoading(true);
    let newData = null;
    if (data.item.numberOfTimesRecognized !== undefined) {
      newData = await removeUnrecognizedItemFromShoppingList(
        authCtx.token,
        list,
        item
      );
    } else {
      newData = await removeItemFromShoppingList(authCtx.token, list, item);
    }
    if (newData === null) {
      refreshList();
    }
    setData(newData || []);
    setLoading(false);
  };

  const unercognizedMark =
    data?.item?.numberOfTimesRecognized !== undefined ? (
      <MaterialCommunityIcons
        name="map-marker-question-outline"
        size={22}
        color="orange"
        style={{ marginRight: 10 }}
      ></MaterialCommunityIcons>
    ) : null;

  const name =
    typeof data?.item?.name === "string"
      ? data.item.name
      : data?.item?.name?.[language] || "Error Extract Name";

  return (
    <View style={styles.item}>
      <View style={styles.nameContainer}>
        {unercognizedMark}
        <Text>{name}</Text>
      </View>
      {loading && <ActivityIndicator size="small" />}
      {!loading && (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              removeItem(authCtx.selectedList, { item: data.item._id });
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.mediumText}>{data.quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              increaseItem(authCtx.selectedList, { item: data.item._id });
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nameContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    paddingRight: 10,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mediumText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#888", // Button background color
    paddingVertical: 6, // Vertical padding for button size
    paddingHorizontal: 12, // Horizontal padding for button size
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShoppingListItem;
