import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles/styles";
import { getShoppingListByUserId } from "../../utils/shoppinglist";
import { ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls dropdown visibility
  const [selectedItem, setSelectedItem] = useState(null); // Holds selected item
  const [items, setItems] = useState([]); // Holds the list of items

  const authCtx = useContext(AuthContext);

  // Use the default shopping list ID if it exists
  const defaultShoppingListId = authCtx.defaultShoppingList || null;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (authCtx.isLoggedIn && authCtx.userId) {
        console.log("User ID (homescreen):", authCtx.userId);
        let data = await getShoppingListByUserId(authCtx.userId);
        setItems(data || []);

        // Only pre-select if defaultShoppingListId is defined
        if (defaultShoppingListId) {
          const defaultItem = data.find(
            (item) => item._id === defaultShoppingListId
          );
          if (defaultItem) {
            setSelectedItem(defaultItem); // Set selected item if found
          }
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [authCtx.isLoggedIn, authCtx.userId, defaultShoppingListId, authCtx.userData]); // Dependencies for useEffect

    

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    authCtx.change_list(item._id);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <View style={styles.container}>
      <Text style={ScreenStyles.topic}>
        Hello there, {authCtx.userFirstName}!
      </Text>
      {loading && <ActivityIndicator size="large" />}
      {!loading && (
        <View style={ScreenStyles.dropdownContainer}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={ScreenStyles.dropdown}
          >
            <Text style={ScreenStyles.dropdownText}>
              {selectedItem ? selectedItem.name : "Select an item"}
            </Text>
            <Ionicons
              name={dropdownOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color={ScreenStyles.icon.color}
            />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={ScreenStyles.dropdownList}>
              <ScrollView>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    style={ScreenStyles.dropdownItem}
                    onPress={() => selectItem(item)}
                  >
                    <Text style={ScreenStyles.dropdownItemText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.item}
        title="Let's start Shopping!"
        borderWidth="2"
      >
        <Ionicons
          name="cart-outline"
          size={ScreenStyles.icon.size}
          color={ScreenStyles.icon.color}
        />
        <Text style={ScreenStyles.buttonText}>Let's start Shopping!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} title="My recipes" borderWidth="2">
        <Ionicons
          name="book-outline"
          size={ScreenStyles.icon.size}
          color={ScreenStyles.icon.color}
        />
        <Text style={ScreenStyles.buttonText}>My recipes</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const ScreenStyles = StyleSheet.create({
  topic: {
    fontSize: styles.text.size.large,
    fontWeight: "bold",
    color: styles.colors.black,
    marginBottom: 20,
    alignSelf: "baseline",
  },
  buttonText: {
    fontSize: styles.text.size.medium,
    color: styles.colors.primary,
  },
  icon: {
    size: 32,
    color: styles.colors.primary,
  },
  dropdownContainer: {
    marginBottom: 20,
    width: "100%", // Set the width to 100% of the parent container
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: styles.colors.white,
    borderWidth: 2,
    borderColor: styles.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5, // Add spacing between dropdowns and other components
    width: "100%", // Set the dropdown width to 100%
  },
  dropdownText: {
    fontSize: styles.text.size.medium,
    color: styles.colors.primary,
    flex: 1, // Allow text to occupy available space
  },
  dropdownList: {
    backgroundColor: styles.colors.white,
    borderWidth: 2,
    borderColor: styles.colors.primary,
    borderRadius: 8,
    maxHeight: 150,
    marginTop: 5, // Space between dropdown button and list
    overflow: "hidden", // Prevent overflow issues
    width: "100%", // Match width with dropdown
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: styles.colors.lightGray,
  },
  dropdownItemText: {
    fontSize: styles.text.size.medium,
    color: styles.colors.primary,
  },
});
