import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { LanguageStringContext } from "../../store/language-context";
import { loginBackend } from "../../http/userHttp";

import { login } from "../../services/auth";

import LoadingScreen from "../general/loadingScreen";

const LoginContent = ({ setIsSignUp, setIsResetPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const { changeLanguage } = useContext(LanguageStringContext);

  const handleLogin = async () => {
    try {
      setLoading(true);
      // Attempt to log in the user
      const userData = await login(email, password);
      if (!userData) {
        setPassword(""); // Reset password field
        Alert.alert("Login failed", "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }
      const user = userData.user;
      const userItem = await loginBackend(email, user.uid);
      if (!userItem) {
        setPassword(""); // Reset password field
        Alert.alert("Login failed", "System error. Please try again later");
        setLoading(false);
        return;
      }
      // Call the context or authentication handler
      authCtx.login(
        userItem.token,
        userItem.data._id,
        user.uid,
        user.email,
        userItem.data
      );

      changeLanguage(userItem.data.language);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/user-not-found") {
        Alert.alert("Login failed", "User not found. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Login failed", "Invalid email. Please try again.");
      } else if (error.code === "auth/invalid-credential") {
        Alert.alert("Login failed", "Invalid credentials. Please try again.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Login failed", "Incorrect password. Please try again.");
      } else if (error.code === "auth/network-request-failed") {
        Alert.alert("Login failed", "Network error. Please try again later.");
      } else {
        Alert.alert(
          "Login failed",
          "An unexpected error occurred. Please try again later."
        );
      }
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
        <TouchableOpacity
          onPress={() => setIsResetPassword(true)}
          style={{ maxHeight: "30%", maxWidth: "100%" }}
        >
          <Text style={{ textAlign: "center", color: "#1F509A" }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
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
    alignContent: "center",
    alignSelf: "center",
    height: "20%",
    width: "60%",
    minHeight: "10%",
  },
  button: {
    marginBottom: 8,
  },
});

export default LoginContent;
