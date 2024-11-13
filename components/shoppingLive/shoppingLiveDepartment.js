import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import ShoppingLiveItem from "./shoppingLiveItem";

const ShoppingLiveDepartment = (props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(props.items);
  const [totalItems, setTotalItems] = React.useState(0);
  const [selectedItems, setSelectedItems] = React.useState(0);

  useEffect(() => {
    const loadData = async () => {
      let total = 0;
      let selected = 0;
      items.forEach((item) => {
        total++;
        if (item.selected) {
          selected++;
        }
      });

      setTotalItems(total);
      setSelectedItems(selected);
    };

    loadData();
  }, []);

  const departmentName = props.departmentName;

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.itemCount}>{totalItems} items total</Text>
      </View>
      <View style={styles.topRightContainer}>
        <Text style={styles.selectedCount}>{selectedItems} selected</Text>
      </View>
      <Text style={styles.departmentName}>{departmentName}</Text>
      {open &&
        items.map((item) => <ShoppingLiveItem key={item._id} item={item} />)}

      <Text style={styles.toggleText} onPress={toggleOpen}>
        Toggle Open
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    width: "90%",
    margin: 8,
    position: "relative",
    borderRadius: 8,
    borderColor: "#000000",
    borderWidth: 1,
  },
  topLeftContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  topRightContainer: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  departmentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemCount: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectedCount: {
    fontSize: 16,
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default ShoppingLiveDepartment;
