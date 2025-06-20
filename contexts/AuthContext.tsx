import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (data) => {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const loadUser = async () => {
    const savedUser = await AsyncStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    router.replace("/auth/login"); // ⬅️ arahkan ke halaman login
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
