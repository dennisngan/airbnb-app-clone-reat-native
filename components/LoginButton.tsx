import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import React, { type ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LoginButtonProps {
  children: ReactNode;
  iconName: keyof typeof Ionicons.glyphMap;
}

const LoginButton = ({ children, iconName }: LoginButtonProps) => {
  return (
    <TouchableOpacity style={styles.btnOutline}>
      <Ionicons name={iconName} style={defaultStyles.btnIcon} size={24} />
      <Text style={styles.btnOutlineText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnOutline: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default LoginButton;
