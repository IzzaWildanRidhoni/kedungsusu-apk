import BottomNavbar from "@/components/BottomComponent";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Image
          source={{
            uri: "https://undraw.co/api/illustrations/undraw_favorites_re_2gyv.svg",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Belum ada favorit</Text>
        <Text style={styles.message}>
          Produk yang kamu sukai akan muncul di sini. Mulai jelajahi dan
          tambahkan ke favoritmu!
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
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
});
