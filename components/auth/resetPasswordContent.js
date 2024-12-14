import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { resetPassword } from "../../services/auth";

const ResetPasswordContent = ({ setIsResetPassword }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      // check if email is valid
      if (!email || email.indexOf("@") === -1) {
        Alert.alert("Invalid email", "Please enter a valid email");
        setLoading(false);
        return;
      }

      // Attempt to reset the password
      const response = await resetPassword(email);
      if (!response || response.error) {
        console.log("Reset password failed");
        Alert.alert(
          "Reset password failed",
          response?.errorMessage || "Please check your email and try again"
        );
        setLoading(false);
        return;
      }

      Alert.alert(
        "Reset password",
        "Password reset email sent. Please check your email"
      );
      setEmail(""); // Reset email field
      setLoading(false);
      setIsResetPassword(false);
    } catch (error) {
      console.error("Reset password error:", error);
      setLoading(false);
      setIsResetPassword(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          disabled={loading}
        />
        <Button
          title="Back to Login"
          onPress={() => setIsResetPassword(false)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "15%",
    width: "60%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 20,
  },
});

export default ResetPasswordContent;
