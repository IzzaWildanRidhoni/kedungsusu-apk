import BottomNavbar from "@/components/BottomComponent";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const orders = [
  {
    id: "1",
    date: "2025-06-20",
    status: "Selesai",
    total: "35.000",
    image: "https://source.unsplash.com/100x100/?milk",
  },
  {
    id: "2",
    date: "2025-06-18",
    status: "Diproses",
    total: "42.000",
    image: "https://source.unsplash.com/100x100/?cow",
  },
];

export default function Orders() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Pesanan Kamu</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.orderId}>Order ID: {item.id}</Text>
                <Text style={styles.date}>Tanggal: {item.date}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.total}>Total: Rp {item.total}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Belum ada pesanan</Text>
          }
        />
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
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  listContainer: {
    gap: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E7FF", // soft border biru muda
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#1E293B",
  },
  date: {
    fontSize: 14,
    color: "#64748B",
  },
  status: {
    fontSize: 14,
    color: "#3B82F6",
    marginTop: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    color: "#1E293B",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});
