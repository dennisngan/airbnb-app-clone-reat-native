import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={[
            styles.headerText,
            { color: active === 0 ? "#000" : Colors.grey },
            { textDecorationLine: active === 0 ? "underline" : "none" },
          ]}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[
            styles.headerText,
            { color: active === 1 ? "#000" : Colors.grey },
            { textDecorationLine: active === 1 ? "underline" : "none" },
          ]}
        >
          Experience
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeaderText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },

  headerText: {
    fontFamily: "mon-sb",
    fontSize: 18,
  },
});
