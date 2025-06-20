import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function MainLayout() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? "home" : "auth/login"}
      >
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="home" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="profile" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
