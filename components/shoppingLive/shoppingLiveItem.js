import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const ShoppingLiveItem = (props) => {
  const itemId = props.item.item._id;
  const name = props.item?.item?.name?.heb || props.item?.item?.name?.eng || props.item?.item?.name || "Unknown";
  const quantity = props.item?.quantity || 0;

  const handleClick = () => {
    console.log("Clicked item", itemId);
    console.log("State before", props.item.checked);
    props.handleItemCheck(props.departmentId, itemId);
    console.log("State after", props.item.checked);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: props.item.checked ? "#9EDF9C" : "#f9f9f9" },
        ]}
        onPress={handleClick}
      >
        <View style={{alignItems: "center"}}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.quantity}>כמות: {quantity}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 16,
    color: "#555",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default ShoppingLiveItem;
