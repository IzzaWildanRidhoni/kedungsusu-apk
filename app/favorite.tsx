import BottomNavbar from "@/components/BottomComponent";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.message}>
          Your favorite products will be listed here.
        </Text>
      </ScrollView>
      <BottomNavbar active="favorite" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },
  innerContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#888",
  },
});
