import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/pages/auth/LoginScreen";
import RegisterScreen from "./src/pages/auth/RegisterScreen";
import HomeScreen from "./src/pages/app/HomeScreen";
import { supabase } from "./src/config/supabase";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Erro ao obter sessão:", error);
        } else {
          setSession(data.session);
        }

        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
