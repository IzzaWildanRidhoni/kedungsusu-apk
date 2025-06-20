import BottomNavbar from "@/components/BottomComponent";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${
    user?.name || "User"
  }&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Informasi Akun</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nama</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user?.role}</Text>
        </View>
      </View>

      <BottomNavbar active="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
    padding: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E7FF",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
  },
  email: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: "#E5EAF5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#334155",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#64748B",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
});
