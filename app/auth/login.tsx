import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const { width } = Dimensions.get("window");

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const bounceValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://wapi.syuhada.id/api/login", {
        email,
        password,
      });
      if (res.data.status) {
        login(res.data.data);
        router.replace("/home");
      }
    } catch (e) {
      setError("Email atau password salah");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animatedBg, { transform: [{ scale: bounceValue }] }]}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/heroo.png")}
            style={styles.hero}
          />
          <Text style={styles.title}>Kedung Susu</Text>
          <Text style={styles.subtitle}>Masuk dulu yuk sebelum belanja</Text>
        </View>

        <View style={styles.card}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Masuk Sekarang</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/auth/register")}>
            <Text style={styles.link}>Belum punya akun? Daftar yuk!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F0FA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  animatedBg: {
    position: "absolute",
    width: 400,
    height: 400,
    backgroundColor: "#D0E8FF",
    borderRadius: 200,
    top: -100,
    left: -100,
    zIndex: -1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  hero: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A8DFF",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  input: {
    width: "100%",
    padding: 14,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 14,
    backgroundColor: "#F2F8FC",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#3A8DFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#3A8DFF",
    fontWeight: "600",
  },
});
