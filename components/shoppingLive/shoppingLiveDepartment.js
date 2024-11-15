import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import ShoppingLiveItem from "./shoppingLiveItem";

const ShoppingLiveDepartment = (props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(props.items);
  const [totalItems, setTotalItems] = React.useState(0);
  const [checkedItems, setCheckedItems] = React.useState(0);

  useEffect(() => {
    const loadData = async () => {
      let total = 0;
      let checked = 0;
      items.forEach((item) => {
        total++;
        if (item.checked) {
          checked++;
        }
      });

      setTotalItems(total);
      setCheckedItems(checked);
    };

    loadData();
  }, []);

  const departmentName = props.departmentName;

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <TouchableOpacity onPress={toggleOpen} style={[styles.container, { backgroundColor: props.departmentCount === props.checkedCount ? "#C2FFC7" : "#f9f9f9"}]}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.itemCount}>{props.departmentCount} items total</Text>
      </View>
      <View style={styles.topRightContainer}>
        <Text style={styles.selectedCount}>{props.checkedCount} checked</Text>
      </View>
      <Text style={styles.departmentName} >{departmentName}</Text>
      {open &&
        items.map((item) => (
          <ShoppingLiveItem
            key={item.item._id}
            item={item}
            departmentId={props.departmentId}
            handleItemCheck={props.handleItemCheck}
          />
        ))}
{/* 
      <Text style={styles.toggleText} onPress={toggleOpen}>
        Toggle Open
      </Text> */}
    </TouchableOpacity>
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
    color: "grey",
  },
});

export default ShoppingLiveDepartment;
