import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (email && senha) {
      navigation.replace("Home");
    } else {
      alert("Preencha todos os campos.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Bem-vindo de volta 👋</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Não tem conta? <Text style={styles.linkBold}>Cadastre-se</Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#6B7280",
    textAlign: "center",
    fontSize: 14,
  },
  linkBold: {
    color: "#10B981",
    fontWeight: "bold",
  },
});
