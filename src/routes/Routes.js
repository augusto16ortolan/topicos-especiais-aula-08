import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";
import HomeScreen from "../pages/app/HomeScreen";
import ProductForm from "../pages/app/ProductForm";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/UserService";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

export default function Routes() {
  const { user, setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      setLoading(true);
      const response = await AsyncStorage.getItem("@user_credentials");
      if (response) {
        const { email, password } = JSON.parse(response);
        const responseLogin = await login(email, password);
        if (responseLogin.error) {
          return;
        }

        console.log(responseLogin);
        setToken(responseLogin.token);
        setUser({ name: responseLogin.name });
      }
    } catch (error) {
      console.error("Ocorreu um erro ao buscar a sessão.", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
