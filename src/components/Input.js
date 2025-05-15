import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function Input({ label, ...rest }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} placeholderTextColor="#999" {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    color: "#111827",
  },
});
