import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { LanguageStringContext } from "../../store/language-context";
import { getUserById } from "../../http/userHttp";

import { login } from "../../services/auth";

import LoadingScreen from "../general/loadingScreen";

const LoginContent = ({ setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const { changeLanguage } = useContext(LanguageStringContext);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Attempt to log in the user
      const user = await login(email, password);
      console.log("User:", user);
      if (!user || user.error) {
        console.log("Login failed");
        setPassword(""); // Reset password field
        Alert.alert(
          "Login failed",
          user?.errorMessage || "Please check your credentials and try again"
        );
        setLoading(false);
        return;
      }

      // Fetch user data by ID (assuming getUserById fetches from the backend)
      const userItem = await getUserById(user.localId);

      if (!userItem) {
        setPassword(""); // Reset password field
        Alert.alert("Login failed", "System error. Please try again later");
        setLoading(false);
        return;
      }

      // Call the context or authentication handler
      authCtx.login(
        user.idToken,
        userItem.data._id,
        user.localId,
        user.email,
        userItem.language,
        userItem.data.first_name,
        userItem.data.last_name,
        userItem.data.default_shopping_list,
        userItem.data
      );
      changeLanguage(userItem.data.language);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      Alert.alert(
        "Login failed",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonView}>
        <Button style={styles.button} title="Login" onPress={handleLogin} />
        <Button
          style={styles.button}
          title="Switch to Signup"
          onPress={() => setIsSignUp(true)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: 100,
    minHeight: "10%",
  },
});

export default LoginContent;
