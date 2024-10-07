import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signUp, login } from "../../services/firebase";
import { AuthContext } from "../../store/auth-context";
import { createUser, getUserById } from "../../http/userHttp";

const AuthScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const userItem = await getUserById(user.uid);
      console.log("User:", user);
      console.log("User Item:", userItem);
      if (user && userItem) {
        console.log("Login successful");
        authCtx.login(
          user.stsTokenManager.accessToken,
          userItem.data._id,
          user.uid,
          user.email,
          userItem.data.first_name,
          userItem.data.last_name,
          userItem.data.default_shopping_list,
          userItem.data
        );
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
      const newUser = await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        userId: user.uid,
      });
      console.log("User:", user);
      console.log("New User:", newUser);
      if (user && newUser) {
        console.log("Signup successful");
        authCtx.login(
          user.stsTokenManager.accessToken,
          newUser.data._id,
          user.uid,
          user.email,
          newUser.first_name,
          newUser.last_name,
          newUser.default_shopping_list,
          newUser.data
        );
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return signupPage ? (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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
