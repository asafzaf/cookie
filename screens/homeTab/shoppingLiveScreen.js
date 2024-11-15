import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ShoppingLiveDepartment from "../../components/shoppingLive/shoppingLiveDepartment";

import {
  getShoppingListById,
  getOrderedShoppingListById,
} from "../../http/shoppingListHttp";

const ShoppingLiveScreen = ({ route, navigation }) => {
  const { listId } = route.params;
  const [shoppingList, setShoppingList] = useState(null);
  const [shoppingListDepartments, setShoppingListDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOrderedShoppingListById(listId);
      if (res) {
        setShoppingList(res.data);
        res.data.orededData.forEach(department => {
          department.items.forEach(item => {
            item.checked = false;
          });
          department.itemCount = department.items.length; // Add item count to department
          department.checkedCount = 0; // Add checked count to department
        });
        setShoppingListDepartments(res.data.orededData);
      } else {
        console.log("Failed to fetch shopping list");
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     // Stop the default back action
  //     e.preventDefault();

  //     // Prompt the user with a confirmation alert
  //     Alert.alert(
  //       'Go back?',
  //       'Are you sure you want to go back?',
  //       [
  //         { text: "Cancel", style: "cancel", onPress: () => {} },
  //         {
  //           text: "Yes",
  //           style: "destructive",
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ]
  //     );
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleItemCheck = (departmentId, itemId) => {
    const newShoppingListDepartments = [...shoppingListDepartments];
    const departmentIndex = newShoppingListDepartments.findIndex(
      (department) => department.id === departmentId
    );
    const itemIndex = newShoppingListDepartments[departmentIndex].items.findIndex(
      (item) => item.item._id === itemId
    );
    newShoppingListDepartments[departmentIndex].items[itemIndex].checked = !newShoppingListDepartments[departmentIndex].items[itemIndex].checked;
    newShoppingListDepartments[departmentIndex].checkedCount = newShoppingListDepartments[departmentIndex].items.filter(item => item.checked).length;
    setShoppingListDepartments(newShoppingListDepartments);
  }

  return (
    <View style={styles.container}>
      <Text>Shopping Live Screen</Text>
      <ScrollView
        style={{ width: "100%", height: 200 }} // Added this line
      >
        <View style={styles.container}>
          {shoppingListDepartments.map((department) => (
            <ShoppingLiveDepartment
              key={department.id}
              departmentId={department.id}
              departmentName={department.department.heb}
              items={department.items}
              departmentCount={department.itemCount}
              checkedCount={department.checkedCount}
              handleItemCheck={handleItemCheck}
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
