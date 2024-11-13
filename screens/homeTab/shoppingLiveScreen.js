import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ShoppingLiveDepartment from "../../components/shoppingLive/shoppingLiveDepartment";

import {
  getShoppingListById,
  getOrderedShoppingListById,
} from "../../http/shoppingListHttp";

const ShoppingLiveScreen = ({ route, navigation }) => {
  const { listId } = route.params;
  const [shoppingList, setShoppingList] = useState(null);
  const [shoppingListDepartments, setShoppingListDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOrderedShoppingListById(listId);
      if (res) {
        setShoppingList(res.data);
        setShoppingListDepartments(res.data.orededData);
      } else {
        console.log("Failed to fetch shopping list");
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Shopping Live Screen</Text>
      <ScrollView
        style={{ width: "100%", height: 200 }} // Added this line
        // data={shoppingListDepartments}
        // renderItem={({ item }) => (
        //   <ShoppingLiveDepartment
        //     key={item.id}
        //     departmentName={item.name}
        //     items={item.items}
        //   ></ShoppingLiveDepartment>
        // )}
      >
        <View style={styles.container}>
          {shoppingListDepartments.map((department) => (
            <ShoppingLiveDepartment
              key={department.id}
              departmentName={department.department.heb}
              items={department.items}
            ></ShoppingLiveDepartment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShoppingLiveScreen;
