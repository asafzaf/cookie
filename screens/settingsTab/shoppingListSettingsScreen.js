import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  getShoppingListById,
  addUserToShoppingList,
  removeUserFromShoppingList,
  addAdminToShoppingList,
  removeAdminFromShoppingList,
} from "../../http/shoppingListHttp";

const ShoppingListSettingsScreen = ({ route, navigation }) => {
  const { userId, listItemId } = route.params;
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Assume the current user is an admin for this example

  //   const [isAdmin, setIsAdmin] = useState(true); // Assume the current user is an admin for this example
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("List Item ID", listItemId);
      const res = await getShoppingListById(listItemId);
      if (res) {
        for (let i = 0; i < res.data.admins.length; i++) {
          for (let j = 0; j < res.data.users.length; j++) {
            if (res.data.admins[i]._id === res.data.users[j]._id) {
              res.data.users[j].isAdmin = true;
            }
          }
        }
        setUsers(res.data.users);
        setAdmins(res.data.admins);
        setLoading(false);
        // Check if the current user is an admin
      } else {
        setLoading(false);
        console.log("Failed to fetch shopping list");
        Alert.alert("Failed to fetch shopping list", "Please try again later");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkAdminStatus = () => {
      setLoading(true);
      console.log("Admins", admins);
      const isAdminCheck = admins.find((admin) => admin._id === userId)
        ? true
        : false;
      setIsAdmin(isAdminCheck);
      setLoading(false);
    };
    checkAdminStatus();
  }, [admins]);

  const toggleAdminStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
  };

  const addUser = async () => {
    if (newUserEmail.trim()) {
      const newUser = {
        userEmail: newUserEmail,
      };
      const res = await addUserToShoppingList(listItemId, newUser);
      if (res) {
        setUsers([...users, res]);
        setNewUserEmail("");
      } else {
        console.log("Failed to add user");
        Alert.alert("Failed to add user", "Please try again later");
        setNewUserEmail("");
      }
    }
  };

  const MakeAdmin = async (userId) => {
    console.log("Make Admin", userId);
    const res = await addAdminToShoppingList(listItemId, userId);
    if (res) {
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isAdmin: true } : user
        )
      );
    } else {
      console.log("Failed to add admin");
      Alert.alert("Failed to add admin", "Please try again later");
    }
  };

  const RemoveAdmin = async (userId) => {
    console.log("Remove Admin", userId);
    const res = await removeAdminFromShoppingList(listItemId, userId);
    console.log("Remove Admin Res", res);
    if (res) {
      console.log("Remove Admin Res!");
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isAdmin: false } : user
        )
      );
    } else {
      console.log("Failed to remove admin");
      Alert.alert("Failed to remove admin", "Please try again later");
    }
  };

  const RemoveUser = async (userId) => {
    const res = await removeUserFromShoppingList(listItemId, userId);
    if (res) {
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      console.log("Failed to remove user");
      Alert.alert("Failed to remove user", "Please try again later");
    }
  };
  //   const isAdmin = admins.find((admin) => admin._id === userId) ? true : false;

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.email}</Text>
      {isAdmin && (
        <Button
          title={item.isAdmin ? "Remove Admin" : "Make Admin"}
          onPress={() =>
            item.isAdmin ? RemoveAdmin(item._id) : MakeAdmin(item._id)
          }
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {!loading && (
        <>
          <Text style={styles.header}>Shopping List Settings</Text>

          <Text style={styles.subHeader}>Users</Text>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item._id}
          />

          {isAdmin && (
            <View style={styles.addUserContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter user email"
                value={newUserEmail}
                onChangeText={setNewUserEmail}
              />
              <Button title="Add User" onPress={addUser} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 18,
  },
  addUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default ShoppingListSettingsScreen;
