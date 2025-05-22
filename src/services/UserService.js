import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email, password) {
  try {
    const response = await api.post("/auth/login", { email, password });
    await AsyncStorage.setItem(
      "@user_credentials",
      JSON.stringify({ email, password })
    );
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao fazer login.", error.message);
    return { error: "Ocorreu um erro ao fazer login." };
  }
}

export async function register(email, password) {
  try {
    const response = await api.post("/auth/register", { email, password });
    await AsyncStorage.setItem(
      "@user_credentials",
      JSON.stringify({ email, password })
    );
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao fazer o cadastro.", error.message);
    return { error: "Ocorreu um erro ao fazer o cadastro." };
  }
}
