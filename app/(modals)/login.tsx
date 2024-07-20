import LoginButton from "@/components/LoginButton";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  useWarmUpBrowser();

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <LoginButton iconName="call-outline">Continue with Phone</LoginButton>
        <LoginButton iconName="logo-apple">Continue with Apple</LoginButton>
        <LoginButton iconName="logo-google">Continue with Google</LoginButton>
        <LoginButton iconName="logo-facebook">
          Continue with Facebook
        </LoginButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 26,
  },

  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },

  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
});

export default Page;
