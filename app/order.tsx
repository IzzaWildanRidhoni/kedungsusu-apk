import BottomNavbar from "@/components/BottomComponent";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.message}>Your recent orders will appear here.</Text>
      </View>
      <BottomNavbar active="order" />
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
    flex: 1,
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
