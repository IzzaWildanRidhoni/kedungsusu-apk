import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function BottomNavbar({ active }: { active: string }) {
  return (
    <View style={styles.navbar}>
      <NavItem
        isActive={active === "home"}
        onPress={() => router.replace("/home")}
        icon={
          <Ionicons
            name="home"
            size={22}
            color={active === "home" ? "#fff" : "#888"}
          />
        }
      />
      <NavItem
        isActive={active === "order"}
        onPress={() => router.replace("/order")}
        icon={
          <MaterialIcons
            name="list-alt"
            size={22}
            color={active === "order" ? "#fff" : "#888"}
          />
        }
      />
      <NavItem
        isActive={active === "favorite"}
        onPress={() => router.replace("/favorite")}
        icon={
          <Ionicons
            name="heart"
            size={22}
            color={active === "favorite" ? "#fff" : "#888"}
          />
        }
      />
      <NavItem
        isActive={active === "profile"}
        onPress={() => router.replace("/profile")}
        icon={
          <FontAwesome
            name="user-circle-o"
            size={22}
            color={active === "profile" ? "#fff" : "#888"}
          />
        }
      />
    </View>
  );
}

function NavItem({
  isActive,
  onPress,
  icon,
}: {
  isActive: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isActive ? styles.activeItem : styles.inactiveItem}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 8,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  activeItem: {
    backgroundColor: "#4D9DE0",
    padding: 10,
    borderRadius: 50,
  },
  inactiveItem: {
    padding: 10,
  },
});
