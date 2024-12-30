import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { LanguageStringContext } from "../../store/language-context";
import { signUpBackend } from "../../http/userHttp";

import { signUp } from "../../services/auth";

import LoadingScreen from "../general/loadingScreen";

const SignupContent = ({ setIsSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const authCtx = useContext(AuthContext);

  const { changeLanguage } = useContext(LanguageStringContext);

  const handleSignup = async () => {
    // Handle signup logic here
    try {
      setLoading(true);
      console.log("Signing up...");
      const user = await signUp(firstName, email, password);
      console.log("user: ", user);
      const newUser = await signUpBackend({
        first_name: firstName,
        last_name: lastName,
        email,
        userId: user.user.uid,
      });
      if (user && newUser) {
        authCtx.login(
          newUser.token,
          newUser.data._id,
          user.user.uid,
          user.user.email,
          newUser
        );
        changeLanguage(newUser.language);

        setLoading(false);
        Alert.alert("Signup successful", "Welcome to the app!");
      } else {
        setLoading(false);
        Alert.alert("Signup failed", "Please try again later...");
      }
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Signup failed", "That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Signup failed", "That email address is invalid!");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Signup failed", "Password is too weak");
      } else if (error.code === "auth/network-request-failed") {
        Alert.alert("Signup failed", "Network error");
      } else {
        Alert.alert("Signup failed", "Please try again later");
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroller}>
        <Text style={styles.title}>Signup</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          blurOnSubmit={false}
          ref={input1Ref}
          onSubmitEditing={() => input2Ref.current.focus()}
          returnKeyType="next"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          blurOnSubmit={false}
          ref={input2Ref}
          onSubmitEditing={() => input3Ref.current.focus()}
          returnKeyType="next"
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          blurOnSubmit={false}
          ref={input3Ref}
          onSubmitEditing={() => input4Ref.current.focus()}
          returnKeyType="next"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          ref={input4Ref}
          returnKeyType="done"
        />
        <View style={styles.buttonView}>
          <Button style={styles.button} title="Signup" onPress={handleSignup} />
          <Button
            style={styles.button}
            title="Back to Login"
            onPress={() => setIsSignUp(false)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    justifyContent: "center",
    padding1: 16,
  },
  container: {
    flex: 1,
    alignContent: "center",
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
