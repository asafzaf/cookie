import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import DeletionModal from "../../components/settingsTab/deletionModal";

import {
  getShoppingListById,
  addUserToShoppingList,
  removeUserFromShoppingList,
  addAdminToShoppingList,
  removeAdminFromShoppingList,
} from "../../http/shoppingListHttp";

import { LanguageStringContext } from "../../store/language-context";

const ShoppingListSettingsScreen = ({ route, navigation }) => {
  const { userId, listItemId } = route.params;
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Assume the current user is an admin for this example
  const [deletionModalVisible, setDeletionModalVisible] = useState(false);
  const [userForRemoval, setUserForRemoval] = useState("");
  const [userIdRemoval, setUserIdRemoval] = useState("");

  const [newUserEmail, setNewUserEmail] = useState("");

  const { translations } = useContext(LanguageStringContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getShoppingListById(listItemId);
      if (res) {
        for (let i = 0; i < res.data.admins.length; i++) {
          for (let j = 0; j < res.data.users.length; j++) {
            if (res.data.admins[i]._id === res.data.users[j]._id) {
              res.data.users[j].isAdmin = true;
            }
          }
        }
        for (let i = 0; i < res.data.pendingUsers.length; i++) {
          let pend = res.data.pendingUsers[i];
          pend.isAdmin = false;
          pend.isPending = true;
          res.data.users.push(pend);
        }
        setUsers(res.data.users);
        setPendingUsers(res.data.pendingUsers);
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

  const addUser = async () => {
    if (newUserEmail.trim()) {
      const userEmail = newUserEmail;
      let res = await addUserToShoppingList(userId, listItemId, userEmail);
      if (res) {
        res.isAdmin = false;
        res.isPending = true;
        setUsers([...users, res]);
        setNewUserEmail("");
        Alert.alert("User added", "Sent invitation to user, pending approval");
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
      setUsers(users.filter((user) => user._id !== userId));
    } else {
      console.log("Failed to remove user");
      Alert.alert("Failed to remove user", "Please try again later");
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.email}</Text>
      {isAdmin && item.isPending && (
        <Text style={styles.pendingUserText}>Pending</Text>
      )}
      {isAdmin && item._id != userId && !item.isPending && (
        <>
          <Button
            title={
              item.isAdmin
                ? translations.settings_tab.remove_admin
                : translations.settings_tab.make_admin
            }
            onPress={() =>
              item.isAdmin ? RemoveAdmin(item._id) : MakeAdmin(item._id)
            }
          />
          <TouchableOpacity
            onPress={() => {
              setDeletionModalVisible(true);
              setUserForRemoval(item.email);
              setUserIdRemoval(item._id);
              console.log("User for removal", item.email);
              console.log("User for removal", item._id);
            }}
          >
            <MaterialCommunityIcons name="delete" size={20} color="red" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <>
            <Text style={styles.header}>
              {translations.settings_tab.shopping_list_settings}
            </Text>
            <Text style={styles.subHeader}>
              {translations.settings_tab.add_user}
            </Text>
            {isAdmin && (
              <View style={styles.addUserContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={translations.settings_tab.enter_user_email}
                  value={newUserEmail}
                  onChangeText={setNewUserEmail}
                />
                <Button
                  title={translations.settings_tab.add_user}
                  onPress={addUser}
                />
              </View>
            )}
            <Text style={styles.subHeader}>
              {translations.settings_tab.user_list}
            </Text>
            <FlatList
              data={users}
              renderItem={renderUserItem}
              keyExtractor={(item) => item._id}
            />
          </>
        )}
      </View>
      {deletionModalVisible && (
        <DeletionModal
          visible={deletionModalVisible}
          setModalVisible={setDeletionModalVisible}
          userEmail={userForRemoval}
          userId={userIdRemoval}
          RemoveUser={RemoveUser}
        />
      )}
    </>
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
    marginRight: 30,
  },
  pendingUserText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});

export default ShoppingListSettingsScreen;
