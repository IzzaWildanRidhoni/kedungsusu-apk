import BottomNavbar from "@/components/BottomComponent";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.info}>Name: {user?.name}</Text>
        <Text style={styles.info}>Email: {user?.email}</Text>
        <Text style={styles.info}>Role: {user?.role}</Text>
      </View>
      <BottomNavbar active="profile" />
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
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});
