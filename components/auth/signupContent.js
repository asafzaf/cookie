import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { LanguageStringContext } from "../../store/language-context";
import { createUser } from "../../http/userHttp";

import { signUp } from "../../services/auth";

import LoadingScreen from "../general/loadingScreen";

const SignupContent = ({ setIsSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const { changeLanguage } = useContext(LanguageStringContext);

  const handleSignup = async () => {
    // Handle signup logic here
    try {
      setLoading(true);
      const user = await signUp(email, password);
      if (user.error) {
        setLoading(false);
        Alert.alert("Signup failed", user.error.message);
        return;
      }
      const newUser = await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        userId: user.user.uid,
      });
      if (user && newUser) {
        authCtx.login(
          user.user.uid,
          newUser._id,
          user.user.uid,
          user.user.email,
          newUser.language,
          newUser.first_name,
          newUser.last_name,
          newUser.default_shopping_list,
          newUser.data
        );
        changeLanguage(newUser.language);
        setLoading(false);
        Alert.alert("Signup successful", "Welcome to the app!");
      } else {
        setLoading(false);
        Alert.alert("Signup failed", "Please try again later");
      }
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
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
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.button} title="Signup" onPress={handleSignup} />
      <Button
        style={styles.button}
        title="Switch to Login"
        onPress={() => setIsSignUp(false)}
      />
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

export default SignupContent;
