import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
// import { signUp, login } from "../../services/firebase";
import { AuthContext } from "../../store/auth-context";
import { LanguageStringContext } from "../../store/language-context";
import { createUser, getUserById } from "../../http/userHttp";

const AuthScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const { changeLanguage } = useContext(LanguageStringContext);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Attempt to log in the user
      const user = await login(email, password);

      if (!user || user.errorCode) {
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
      const userItem = await getUserById(user.uid);

      if (!userItem) {
        console.log("User item fetch failed");
        setPassword(""); // Reset password field
        Alert.alert("Login failed", "System error. Please try again later");
        setLoading(false);
        return;
      }

      // Call the context or authentication handler
      authCtx.login(
        user.stsTokenManager.accessToken,
        userItem.data._id,
        user.uid,
        user.email,
        user.language,
        userItem.data.first_name,
        userItem.data.last_name,
        userItem.data.default_shopping_list,
        userItem.data
      );
      changeLanguage(userItem.data.language);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      Alert.alert(
        "Login failed",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  const handleSignup = async () => {
    // Handle signup logic here
    try {
      const user = await signUp(email, password);
      const newUser = await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        userId: user.uid,
      });
      if (user && newUser) {
        authCtx.login(
          user.stsTokenManager.accessToken,
          newUser._id,
          user.uid,
          user.email,
          newUser.language,
          newUser.first_name,
          newUser.last_name,
          newUser.default_shopping_list,
          newUser.data
        );
        Alert.alert("Signup successful", "Welcome to the app!");
      } else {
        Alert.alert("Signup failed", "Please try again later");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const loadingScreen = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const signUpPage = () => {
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
          onPress={() => setIsSignUpPage(false)}
        />
      </View>
    );
  };

  const loginPage = () => {
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
            onPress={() => setIsSignUpPage(true)}
          />
        </View>
      </View>
    );
  };

  let content;
  if (loading) {
    content = loadingScreen();
  } else if (isSignUpPage) {
    content = signUpPage();
  } else {
    content = loginPage();
  }

  return content;
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
    justifyContent: 'space-around',
    height: 100,
    minHeight: "10%",
  },
});

export default AuthScreen;
