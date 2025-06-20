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

export default function Register() {
  const { login, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const bounceValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (user) router.replace("/home");
  }, [user]);

  const handleRegister = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    if (!email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Format email tidak valid";
    if (!password.trim()) newErrors.password = "Password wajib diisi";
    else if (password.length < 6)
      newErrors.password = "Password minimal 6 karakter";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("https://wapi.syuhada.id/api/register", {
        name,
        email,
        password,
      });

      if (res.data.status) {
        login(res.data.data);
        router.replace("/home");
      } else {
        setErrors({ general: res.data.message || "Gagal registrasi." });
      }
    } catch (err: any) {
      const responseData = err?.response?.data;
      if (responseData?.data) {
        const apiErrors: { [key: string]: string } = {};
        Object.entries(responseData.data).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            apiErrors[field] = messages[0];
          }
        });
        setErrors(apiErrors);
      } else {
        setErrors({ general: "Registrasi gagal. Silakan coba lagi." });
      }
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
          <Text style={styles.title}>Daftar Akun</Text>
          <Text style={styles.subtitle}>
            Yuk bergabung dan mulai belanja susu!
          </Text>
        </View>

        <View style={styles.card}>
          {errors.general && <Text style={styles.error}>{errors.general}</Text>}

          <TextInput
            placeholder="Nama"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors({ ...errors, name: "" });
            }}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: "" });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: "" });
            }}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Daftar Sekarang</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/auth/login")}>
            <Text style={styles.link}>Sudah punya akun? Login yuk!</Text>
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
