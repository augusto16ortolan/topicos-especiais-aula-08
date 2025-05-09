import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import supabase from "../../config/supabase";
export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data } = await supabase.auth.getSession();
    setUser(data?.session?.user);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo ao seu App!</Text>
      <Text style={styles.subtext}>{user?.email}</Text>
      <Text style={styles.subtext}>Estamos felizes em ter você aqui.</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
