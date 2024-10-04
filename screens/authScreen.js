import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signUp, login } from "../services/firebase";
import { AuthContext } from "../store/auth-context";

const AuthScreen = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [signupPage, setSignupPage] = useState(false);

  const authCtx = useContext(AuthContext);

  const handleLogin = async () => {
    // Handle login logic here
    try {
      console.log("email:", email);
      console.log("Password:", password);
      const user = await login(email, password);
      console.log("User:", user);
      if (user) {
        console.log("Login successful");
        authCtx.login(user.stsTokenManager.accessToken, user.uid, user.email);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSignup = async () => {
    // Handle signup logic here
    try {
      console.log("email:", email);
      console.log("Password:", password);
      const user = await signUp(email, password);
      console.log("User:", user);
    } catch (error) {
      console.log("error:", error);
    }
    if (user) {
      console.log("Signup successful");
      authCtx.signUp(user.stsTokenManager.accessToken, user.uid, user.email);
    } else {
      console.log("Login failed");
    }
  };

  return signupPage ? (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setemail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Switch to Login" onPress={() => setSignupPage(false)} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setemail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Switch to Signup" onPress={() => setSignupPage(true)} />
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
});

export default AuthScreen;
