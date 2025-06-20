// app/index.tsx
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/heroo.png")} style={styles.image} />
      <Text style={styles.title}>Find Your Dream Product Here</Text>
      <Text style={styles.subtitle}>
        Join us and discover the best product near you
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/auth/login")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: { width: 240, height: 240, marginBottom: 30 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4D9DE0",
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
    width: "100%",
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
