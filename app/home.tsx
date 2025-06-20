import BottomNavbar from "@/components/BottomComponent";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

const { width } = Dimensions.get("window");

export default function Home() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get("https://wapi.syuhada.id/api/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios.post(
          "https://wapi.syuhada.id/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      await AsyncStorage.removeItem("token");
      logout();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Gagal Logout", "Silakan coba lagi.");
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.image_url
            ? `https://wapi.syuhada.id/storage/${item.image_url}`
            : "https://source.unsplash.com/300x300/?milk,cow",
        }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rp {item.price}</Text>
    </View>
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <View>
                  <Text style={styles.greeting}>Hai,</Text>
                  <Text style={styles.username}>{user?.name || "User"} 👋</Text>
                </View>
                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.logoutButton}
                >
                  <Feather name="log-out" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#aaa" />
                <TextInput
                  placeholder="Cari produk susu..."
                  style={styles.searchInput}
                  placeholderTextColor="#aaa"
                />
              </View>

              <View style={styles.banner}>
                <View>
                  <Text style={styles.bannerText}>Diskon 30% Susu Murni!</Text>
                  <TouchableOpacity style={styles.bannerButton}>
                    <Text style={styles.bannerButtonText}>
                      Belanja Sekarang
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require("../assets/heroo.png")}
                  style={styles.bannerImage}
                />
              </View>

              <Text style={styles.sectionTitle}>Produk Unggulan</Text>
            </>
          }
          data={paginatedProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.productGrid}
          ListFooterComponent={
            totalPages > 1 && (
              <View style={styles.paginationContainer}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <TouchableOpacity
                    key={i + 1}
                    style={[
                      styles.pageButton,
                      currentPage === i + 1 && styles.pageButtonActive,
                    ]}
                    onPress={() => setCurrentPage(i + 1)}
                  >
                    <Text
                      style={{
                        color: currentPage === i + 1 ? "#fff" : "#4D9DE0",
                      }}
                    >
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )
          }
        />

        <BottomNavbar active="home" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F7FF",
  },
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: "#555",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF5C5C",
    padding: 8,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  banner: {
    backgroundColor: "#86C8FF",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 25,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    width: 160,
  },
  bannerButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  bannerButtonText: {
    color: "#4D9DE0",
    fontWeight: "600",
  },
  bannerImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productGrid: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    width: (width - 60) / 2,
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  productName: {
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: "bold",
    color: "#4D9DE0",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  pageButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4D9DE0",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pageButtonActive: {
    backgroundColor: "#4D9DE0",
  },
});
