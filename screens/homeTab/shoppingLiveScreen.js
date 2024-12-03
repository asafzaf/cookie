import React, { useState, useEffect, useContext } from "react";
import {
  BackHandler,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ShoppingLiveDepartment from "../../components/shoppingLive/shoppingLiveDepartment";

import { AuthContext } from "../../store/auth-context";

import {
  getShoppingListById,
  getOrderedShoppingListById,
  updateLiveShoppingList,
} from "../../http/shoppingListHttp";

import { LanguageStringContext } from "../../store/language-context";

const ShoppingLiveScreen = ({ route, navigation }) => {
  const { listId } = route.params;
  const [shoppingList, setShoppingList] = useState(null);
  const [shoppingListDepartments, setShoppingListDepartments] = useState([]);

  const authCtx = useContext(AuthContext);

  const { translations } = useContext(LanguageStringContext);

  const childTranslation = {
    items_total: translations.home_screen.items_total,
    items_checked: translations.home_screen.items_checked,
    quantity: translations.home_screen.quantity,
  };

  const backButtonPrev = {
    back_button_disabled: translations.alerts.back_button_disabled,
    back_button_disabled_message:
      translations.alerts.back_button_disabled_message,
    back_button_disabled_confirm:
      translations.alerts.back_button_disabled_confirm,
  };

  const language = translations.language;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOrderedShoppingListById(listId);
      if (res) {
        setShoppingList(res.data);
        res.data.orededData.forEach((department) => {
          department.items.forEach((item) => {
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

  useEffect(() => {
    // Disable Android back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Prevent back navigation
        Alert.alert(
          backButtonPrev.back_button_disabled,
          backButtonPrev.back_button_disabled_message,
          [{ text: backButtonPrev.back_button_disabled_confirm, onPress: () => null }],
          { cancelable: false }
        );
        return true; // Returning true prevents the default behavior
      }
    );

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  const handleItemCheck = (departmentId, itemId) => {
    const newShoppingListDepartments = [...shoppingListDepartments];
    const departmentIndex = newShoppingListDepartments.findIndex(
      (department) => department.id === departmentId
    );
    const itemIndex = newShoppingListDepartments[
      departmentIndex
    ].items.findIndex((item) => item.item._id === itemId);
    newShoppingListDepartments[departmentIndex].items[itemIndex].checked =
      !newShoppingListDepartments[departmentIndex].items[itemIndex].checked;
    newShoppingListDepartments[departmentIndex].checkedCount =
      newShoppingListDepartments[departmentIndex].items.filter(
        (item) => item.checked
      ).length;
    setShoppingListDepartments(newShoppingListDepartments);
    authCtx.updateCheckedList(newShoppingListDepartments);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        {translations.home_screen.live_shopping_topic}
      </Text>
      <ScrollView
        style={{ width: "100%", height: 200 }} // Added this line
      >
        <View style={styles.container}>
          {shoppingListDepartments.map((department) => (
            <ShoppingLiveDepartment
              key={department.id}
              language={language}
              translations={childTranslation}
              departmentId={department.id}
              departmentName={department.department}
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
  Text: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ShoppingLiveScreen;
